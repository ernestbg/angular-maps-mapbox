import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .container_map {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        z-index: 999;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        width: 450px;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map') divMap!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 3;
  center: [number, number] = [-3.609771074840447, 39.46382264637831];

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMap.nativeElement, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
    });

    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map.getZoom();
    });

    this.map.on('zoomend', (event) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18);
      }
    });

    this.map.on('move', (event) => {
      const target = event.target;
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });
  }

  zoomIn() {
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom();
  }

  zoomOut() {
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
  }

  zoomChanged(value: string) {
    this.map.zoomTo(Number(value));
  }

  ngOnDestroy(): void {
    this.map.off('zoom', () => {});
    this.map.off('zoomend', () => {});
    this.map.off('move', () => {});
  }
}
