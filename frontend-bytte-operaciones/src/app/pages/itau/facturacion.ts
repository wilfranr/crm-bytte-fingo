import { Component } from '@angular/core';
import { FluidModule } from 'primeng/fluid';

/**
 * @description Componente para la sección de facturación de Itaú.
 * Muestra un ejemplo de la funcionalidad de facturación.
 */
@Component({
  selector: 'app.facturacion-itau',
  standalone: true,
  imports: [FluidModule],
  template: `<p-fluid>
    <div><h1>facturacion de Itaú!!</h1></div>
    <div><p>Este es un ejemplo de facturación de Itaú</p></div>
    </p-fluid>`

})
export class Facturacion{}