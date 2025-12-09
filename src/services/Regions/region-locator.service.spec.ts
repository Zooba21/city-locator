import { Region } from "@/types";
import { HttpResourceRef } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { ApplicationRef } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { mockRegions } from "../../testing/test-data";
import { getCommonTestProviders } from "../../testing/test-providers";
import RegionLocatorService from "./region-locator.service";

describe('RegionLocatorService', () => {
  let service: RegionLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: getCommonTestProviders()
    });
    service = TestBed.inject(RegionLocatorService);
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of regions', async () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    let regionsResource: HttpResourceRef<Region[] | undefined>;
    TestBed.runInInjectionContext(() => {
      regionsResource = service.findAll();
    });

    TestBed.tick();

    const req = httpTestingController.expectOne('https://geo.api.gouv.fr/regions');
    expect(req.request.method).toBe('GET');
    req.flush(mockRegions);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(regionsResource!.value()).toEqual(mockRegions);
    httpTestingController.verify();
  })
});
