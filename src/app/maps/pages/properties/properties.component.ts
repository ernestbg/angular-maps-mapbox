import { Component } from '@angular/core';


interface Property {
  title: string;
  description: string;
  lngLat: [number, number];
}


@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [
  ]
})



export class PropertiesComponent {

  properties: Property[] = [
    {
      title: 'Supermercado Ahorramás, Consuegra',
      description: 'Tienda de comestibles en Consuegra',
      lngLat: [-3.6044066567655135,39.46365698736347]
    },
    {
      title: 'Bola del Mundo, Madrid',
      description: 'Montaña ubicada en la Sierra de Guadarrama',
      lngLat: [-3.9797544901573993, 40.786415756823295]
    },
    {
      title: 'Playa de Gulpiyuri, Asturias',
      description: 'Pequeña playa ubicada en Asturias',
      lngLat: [-4.8865384018306415, 43.44890707086421 ]
    },
    {
      title: 'Pico Aneto, Huesca',
      description: 'Montaña más alta de la cordillera pirenaica',
      lngLat: [0.656558208400609, 42.63928795748965 ]
    },
  ]

}
