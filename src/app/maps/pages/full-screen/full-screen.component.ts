import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #map {
        width:100%;
        height:100%;
      }
    `,
  ],
})
export class FullScreenComponent implements OnInit {
  ngOnInit(): void {
   
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-3.609771074840447, 39.46382264637831 ], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
  }
}
