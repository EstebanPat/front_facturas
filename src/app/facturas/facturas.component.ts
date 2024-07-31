import { Component } from '@angular/core';
import { XMLBuilder } from 'fast-xml-parser';


interface Emisor {
  nit: string;
  nombre:string
}
interface Receptor {
  nit: string;
  nombre:string
}

interface factura {
  emisor: Emisor;
  receptor: Receptor;
  numero: number;
}
@Component({
  
  selector: 'app-facturas',
  standalone: true,
  imports: [],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})

export class FacturasComponent {

  facturas: factura[] = []
  
  onSubmit(NitEmisor: HTMLInputElement, fechaInicio: HTMLInputElement, fechaFin: HTMLInputElement): void {
    
    console.log(NitEmisor.value);
    console.log(fechaInicio.value);
    console.log(fechaFin.value);
    
    const url = new URL(`https://localhost:7017/api/factura/byNitAndDateRange`)
    url.searchParams.append('nitEmisor',NitEmisor.value)
    url.searchParams.append('endDate', fechaFin.value)
    url.searchParams.append('startDate', fechaInicio.value)

    
    fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('Datos recibidos', data);
      this.facturas = data
      console.log(this.facturas);
    })
    .catch(error => {
      console.error('Error al obtener los datos', error);
    });
  }

  jsonToXML(json: any): string {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
      suppressEmptyNode: true
    });
    return builder.build(json);
  }

  downloadXML(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToXML() {
    const xml = this.jsonToXML(this.facturas);
    this.downloadXML(xml, 'facturas', 'application/xml');
  }
}
