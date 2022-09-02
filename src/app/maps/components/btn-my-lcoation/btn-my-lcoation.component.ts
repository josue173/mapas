import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-lcoation',
  templateUrl: './btn-my-lcoation.component.html',
  styleUrls: ['./btn-my-lcoation.component.scss'],
})
export class BtnMyLcoationComponent {
  constructor(
    private _mapService: MapService,
    private _placesService: PlacesService
  ) {}

  goToMyLocation() {
    if (!this._placesService.IsUserLocationReady)
      throw Error('No hay ubicación de usuario');
    if (!this._mapService.isMapReady) throw Error('No hay mapa disponible');
    this._mapService.flyTo(this._placesService.userLocation!);
  }
}
