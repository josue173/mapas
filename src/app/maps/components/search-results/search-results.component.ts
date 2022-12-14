import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent {
  public selectedId: string = '';
  constructor(
    private _placesService: PlacesService,
    private _mapsService: MapService
  ) {}

  get isLoadingPlaces(): Boolean {
    return this._placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this._placesService.places;
  }

  flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this._mapsService.flyTo([lng, lat]);
  }

  getDirections(place: Feature) {
    if (!this._placesService.userLocation) throw Error('No hay user location');

    this._placesService.deletePlaces();

    const start = this._placesService.userLocation;
    const end = place.center as [number, number];

    this._mapsService.getRouterBetweenPoints(start, end);
  }
}
