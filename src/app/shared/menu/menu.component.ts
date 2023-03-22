import { Component } from '@angular/core';

interface Menu {
  path: string;
  name: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent {
  menuItems: Menu[] = [
    {
      path: '/maps/fullscreen',
      name: 'Fullscreen',
    },
    {
      path: '/maps/zoom-range',
      name: 'Zoom-range',
    },
    {
      path: '/maps/markers',
      name: 'Markers',
    },
    {
      path: '/maps/properties',
      name: 'Properties',
    }
  ];
}
