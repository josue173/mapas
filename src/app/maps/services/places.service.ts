import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesResponsee, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get IsUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private _placesApi: PlacesApiClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (error) => {
          alert(error);
          console.log(error);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    if (!this.userLocation) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    this._placesApi
      .get<PlacesResponsee>(`/${query}.json?`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((resp) => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
  }
}
