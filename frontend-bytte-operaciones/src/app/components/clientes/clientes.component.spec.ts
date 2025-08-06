import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ClientesComponent } from '../../pages/clientes/clientes.component';
import { ClienteService } from '../../services/cliente.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

describe('ClientesComponent', () => {
  let component: ClientesComponent;
  let fixture: ComponentFixture<ClientesComponent>;
  let mockClienteService: jasmine.SpyObj<ClienteService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  const mockClientes = [
    { id: '1', name: 'Cliente Alfa', email: 'alfa@test.com', mobile: '111', company_name: 'Empresa A', form_id: 'F1' },
    { id: '2', name: 'Cliente Beta', email: 'beta@test.com', mobile: '222', company_name: 'Empresa B', form_id: 'F2' },
  ];

  // Mock del componente p-table
  const mockTable = {
    filterGlobal: jasmine.createSpy('filterGlobal'),
    clear: jasmine.createSpy('clear'),
    value: mockClientes,
  };

  beforeEach(async () => {
    mockClienteService = jasmine.createSpyObj('ClienteService', ['getClientes']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    // Mock de la API del portapapeles
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: jasmine.createSpy('writeText').and.resolveTo(undefined),
      },
      writable: true,
    });

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ClientesComponent, // Importar el componente standalone
      ],
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
        { provide: MessageService, useValue: mockMessageService },
      ],
    }).compileComponents();

    mockClienteService.getClientes.and.returnValue(of(mockClientes));

    fixture = TestBed.createComponent(ClientesComponent);
    component = fixture.componentInstance;
    
    // Asignar el mock de la tabla al componente
    component.dt1 = mockTable as unknown as Table;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on init', () => {
    expect(mockClienteService.getClientes).toHaveBeenCalled();
    expect(component.clientes.length).toBe(2);
    expect(component.clientCount).toBe(2);
    expect(component.clientes[0].name).toBe('Cliente Alfa');
  });

  it('should call table filter when onGlobalFilter is called', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = 'Beta';
    
    const event = { target: inputElement };
    component.onGlobalFilter(component.dt1, event);

    expect(mockTable.filterGlobal).toHaveBeenCalledWith('Beta', 'contains');
  });

  it('should clear the table filter when clear is called', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    component.filterValue = 'some value';
    
    component.clear(component.dt1);

    expect(mockTable.clear).toHaveBeenCalled();
    expect(component.filterValue).toBe('');
  });

  it('should copy text to clipboard on onCellDblClick', async () => {
    const textToCopy = 'alfa@test.com';
    await component.onCellDblClick(textToCopy);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(textToCopy);
    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Copiado',
      detail: 'Texto copiado al portapapeles',
      life: 2000,
    });
  });

  it('should show error message if clipboard write fails', async () => {
    const error = new Error('Clipboard failed');
    (navigator.clipboard.writeText as jasmine.Spy).and.rejectWith(error);

    const textToCopy = 'some text';
    await component.onCellDblClick(textToCopy);

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo copiar el texto',
      life: 2000,
    });
  });
});