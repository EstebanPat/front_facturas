import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FacturasComponent } from "./facturas/facturas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FacturasComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front_factura';
}
