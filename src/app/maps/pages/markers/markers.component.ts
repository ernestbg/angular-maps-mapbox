import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-markers',
  templateUrl: './markers.component.html',
  styles: [
    `
      .container_map {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 999;
      }

      li {
        cursor: pointer;
      }
    `,
  ],
})
export class MarkersComponent implements AfterViewInit {
  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 3;
  center: [number, number] = [-3.609771074840447, 39.46382264637831];
  markers: MarkerColor[] = [];

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    // const markerHtml:HTMLElement=document.createElement('div');
    // markerHtml.innerHTML='prueba';

    // new mapboxgl.Marker({
    //   //element:markerHtml
    // }).setLngLat(this.center).addTo(this.map);

    this.readLocalStorage();
  }
  addMarker() {
    const hexColor = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const newMarker = new mapboxgl.Marker({
      draggable: true,
      color: hexColor,
    })
      .setLngLat(this.center)
      .addTo(this.map);

    this.markers.push({
      color: hexColor,
      marker: newMarker,
    });
    this.saveMarkers();

    newMarker.on('dragend', () => {
      this.saveMarkers();
    });
  }

  goMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({ center: marker!.getLngLat() });
  }

  saveMarkers() {
    const lngLatArray: MarkerColor[] = [];

    this.markers.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArray.push({
        color: color,
        center: [lng, lat],
      });
    });

    localStorage.setItem('markers', JSON.stringify(lngLatArray));
  }

  readLocalStorage() {
    if (!localStorage.getItem('markers')) {
      return;
    }

    const lngLatArray: MarkerColor[] = JSON.parse(
      localStorage.getItem('markers')!
    );
    lngLatArray.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.center!)
        .addTo(this.map);

      this.markers.push({
        marker: newMarker,
        color: m.color,
      });

      newMarker.on('dragend', () => {
        this.saveMarkers();
      });
    });
  }

  deleteMarker(i:number){
    this.markers[i].marker?.remove();
    this.markers.splice(i,1);
    this.saveMarkers();

  }
}
