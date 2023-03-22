import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
    div{
      width:100%;
      height:150px;
      margin:0px;
    }
    `
  ]
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('map') divMap!: ElementRef;

  ngAfterViewInit(): void {

    const map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 11, // starting zoom
      interactive:false
    });

    new mapboxgl.Marker()
    .setLngLat(this.lngLat)
    .addTo(map)

  }

}
