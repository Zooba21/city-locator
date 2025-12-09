import { mockCities } from "@/testing/test-data";
import { getCommonTestProviders } from "@/testing/test-providers";
import { City } from "@/types";
import { HttpResourceRef } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { ApplicationRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import CityLocatorService from "./city-locator.service";

describe('CityLocatorService', () => {
  let service: CityLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: getCommonTestProviders()
    });
    service = TestBed.inject(CityLocatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of cities', async () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    let citiesResource: HttpResourceRef<City[] | undefined>;
    TestBed.runInInjectionContext(() => {
      citiesResource = service.findByDepartment('14');
    });

    TestBed.tick();

    const req = httpTestingController.expectOne('https://geo.api.gouv.fr/departements/14/communes');
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(citiesResource!.value()).toEqual(mockCities);
    httpTestingController.verify();
  });
});
