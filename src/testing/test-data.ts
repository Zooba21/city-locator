import { signal } from '@angular/core';
import { City, Department, Region } from '../types';

export const mockRegions: Region[] = [
  { nom: 'Normandie', code: '28' },
  { nom: 'Bretagne', code: '53' }
];

export const mockDepartments: Department[] = [
  { nom: 'Calvados', code: '14', codeRegion: '28' },
  { nom: 'Manche', code: '50', codeRegion: '28' }
];

export const mockCities: City[] = [
  { nom: 'Caen', code: '14118', codeDepartement: '14', codeRegion: '28' },
  { nom: 'Bayeux', code: '14047', codeDepartement: '14', codeRegion: '28' }
];

export const mockRegionService = {
  findAll: () => ({ 
    value: signal(mockRegions).asReadonly(),
    isLoading: signal(false).asReadonly(),
    error: signal(null).asReadonly(),
    status: signal('success').asReadonly()
  })
};

export const mockDepartmentService = {
  findOne: () => ({ 
    value: signal(mockDepartments[0]).asReadonly(),
    isLoading: signal(false).asReadonly(),
    error: signal(null).asReadonly(),
    status: signal('success').asReadonly()
  }),
  findByRegion: () => ({ 
    value: signal(mockDepartments).asReadonly(),
    isLoading: signal(false).asReadonly(),
    error: signal(null).asReadonly(),
    status: signal('success').asReadonly()
  })
};

export const mockCityService = {
  findByDepartment: () => ({ value: signal(mockCities).asReadonly() })
};
