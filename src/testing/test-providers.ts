import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Provider, EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { API_URL } from '../app/tokens';

export const getCommonTestProviders = (): (Provider | EnvironmentProviders)[] => [
  {
    provide: API_URL,
    useValue: 'https://geo.api.gouv.fr'
  },
  provideHttpClient(),
  provideHttpClientTesting(),
  provideRouter([]),
];
