import { Routes } from '@angular/router';
import { CityLocator } from './pages/city-locator/city-locator';
import { RegionLocator } from './pages/region-locator/region-locator';
export const routes: Routes = [
  { 
    path: '', 
    component: RegionLocator, 
    title: 'Rechercher une région',
    data: { animation: 'slide-out' }
  },
  { 
    path: ':departmentCode', 
    component: CityLocator, 
    title: 'Recherche une ville',
    data: { animation: 'slide-in' }
  },
  { path: '**', redirectTo: 'region-locator', pathMatch: 'full' },
];
