import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  constructor(private _placesService: PlacesService) {}

  ngAfterViewInit(): void {
    if (!this._placesService.userLocation)
      throw Error('No hay placesService.getUserLocation');

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this._placesService.userLocation, // starting position [lng, lat]
      zoom: 9, // starting zoom
      // projection: 'globe', // display the map as a 3D globe
    });
    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
    });
  }
}
