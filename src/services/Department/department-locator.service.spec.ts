import { mockDepartments } from "@/testing/test-data";
import { getCommonTestProviders } from "@/testing/test-providers";
import { Department } from "@/types";
import { HttpResourceRef } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { ApplicationRef, signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import DepartmentLocatorService from "./department-locator.service";

describe('DepartmentLocatorService', () => {
  let service: DepartmentLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: getCommonTestProviders()
    });
    service = TestBed.inject(DepartmentLocatorService);
  });

  it('should be created', () => {
    expect(true).toBeTruthy();
  });

  it('should return the list of departments', async () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    let departmentsResource: HttpResourceRef<Department[] | undefined>;
    TestBed.runInInjectionContext(() => {
      const regionSignal = signal<string>('14');
      departmentsResource = service.findByRegion(regionSignal);
    });

    TestBed.tick();

    const req = httpTestingController.expectOne('https://geo.api.gouv.fr/regions/14/departements');
    expect(req.request.method).toBe('GET');
    req.flush(mockDepartments);

    await TestBed.inject(ApplicationRef).whenStable();
    expect(departmentsResource!.value()).toEqual(mockDepartments);
    httpTestingController.verify();
  });
});
