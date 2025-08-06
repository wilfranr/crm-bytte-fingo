import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { EditClienteComponent } from './edit-cliente.component';
import { ClienteService } from '../../../core/services/cliente.service';
import { LocationService } from '../../../core/services/location.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('EditClienteComponent', () => {
  let component: EditClienteComponent;
  let fixture: ComponentFixture<EditClienteComponent>;
  let mockClienteService: jasmine.SpyObj<ClienteService>;
  let mockLocationService: jasmine.SpyObj<LocationService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute;

  const mockCliente = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    mobile: '123456789',
    direccion: 'Test Address',
    pais: 'Colombia',
    departamento: '1',
    ciudad: '1-1'
  };

  beforeEach(async () => {
    mockClienteService = jasmine.createSpyObj('ClienteService', ['getClienteById', 'updateCliente']);
    mockLocationService = jasmine.createSpyObj('LocationService', ['getDepartments', 'getCitiesByDepartment']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => '123',
        },
      },
    };

    mockClienteService.getClienteById.and.returnValue(of(mockCliente));
    mockLocationService.getDepartments.and.returnValue(of([{ id: '1', departamento: 'Antioquia' }]));
    mockLocationService.getCitiesByDepartment.and.returnValue(of([{ id: '1-1', name: 'Medellín' }]));

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastModule,
        CardModule,
        DropdownModule,
        NoopAnimationsModule,
        EditClienteComponent // Importar el componente standalone
      ],
      providers: [
        { provide: ClienteService, useValue: mockClienteService },
        { provide: LocationService, useValue: mockLocationService },
        { provide: MessageService, useValue: mockMessageService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load client data on init', () => {
    expect(mockClienteService.getClienteById).toHaveBeenCalledWith('123');
    expect(component.editForm.value.name).toBe('Test User');
    expect(component.editForm.value.email).toBe('test@example.com');
  });

  it('should validate email format', () => {
    const emailControl = component.editForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();

    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.editForm.get('name')?.setValue('');
    component.onSubmit();
    expect(mockClienteService.updateCliente).not.toHaveBeenCalled();
  });

  it('should call updateCliente on valid form submission', () => {
    component.editForm.setValue(mockCliente); // Asegurar que el formulario es válido
    mockClienteService.updateCliente.and.returnValue(of({}));

    component.onSubmit();

    expect(mockClienteService.updateCliente).toHaveBeenCalledWith('123', mockCliente);
  });

  it('should show success message and navigate on successful update', fakeAsync(() => {
    component.editForm.setValue(mockCliente);
    mockClienteService.updateCliente.and.returnValue(of({}));

    component.onSubmit();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Cliente actualizado correctamente',
    });

    tick(1500); // Simular el paso del tiempo para el setTimeout
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/clientes']);
  }));

  it('should show error message on failed update', () => {
    component.editForm.setValue(mockCliente);
    mockClienteService.updateCliente.and.returnValue(throwError(() => new Error('Update failed')));

    component.onSubmit();

    expect(mockMessageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo actualizar el cliente',
    });
  });

  it('should load cities when a department is selected', () => {
    const departmentControl = component.editForm.get('departamento');
    departmentControl?.setValue('1');
    fixture.detectChanges();

    expect(mockLocationService.getCitiesByDepartment).toHaveBeenCalledWith('1');
    expect(component.cities.length).toBe(1);
    expect(component.cities[0].name).toBe('Medellín');
  });
});