import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW50b3luMTczIiwiYSI6ImNrdTh3a2QycDAxN2sycHF2dTBnMmR5NTgifQ.07hlnd6ttTBF8PVXuBKxXQ';

if (!navigator.geolocation) {
  alert('Navegador no soporta la geolocalización');
  throw new Error('Navegador no soporta la geolocaolización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
