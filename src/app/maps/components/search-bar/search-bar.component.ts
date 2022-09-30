import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  private debounceTimer?: NodeJS.Timeout;

  constructor(private _placesService: PlacesService) {}

  onQueryChange(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      // console.log('Mandar este query', query);
      this._placesService.getPlacesByQuery(query);
    }, 350);
  }
}
