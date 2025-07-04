import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionMiidComponent } from './facturacion-miid.component';

describe('FacturacionMiidComponent', () => {
  let component: FacturacionMiidComponent;
  let fixture: ComponentFixture<FacturacionMiidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturacionMiidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturacionMiidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
