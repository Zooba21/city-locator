import { TestBed } from '@angular/core/testing';

import { mockCities, mockDepartments } from '@/testing/test-data';
import { getCommonTestProviders } from '@/testing/test-providers';
import { HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { CityLocator } from './city-locator';

describe('CityLocator', () => {
  let component: CityLocator;
  let harness: RouterTestingHarness;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        ...getCommonTestProviders(),
        provideRouter([
          { path: 'departments/:departmentCode', component: CityLocator }
        ])
      ]
    });

    harness = await RouterTestingHarness.create();
    component = await harness.navigateByUrl('/departments/14', CityLocator);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    const departmentReq = httpTestingController.expectOne('https://geo.api.gouv.fr/departements/14');
    departmentReq.flush(mockDepartments[0]);

    const citiesReq = httpTestingController.expectOne('https://geo.api.gouv.fr/departements/14/communes');
    citiesReq.flush(mockCities);

    expect(component).toBeTruthy();
    httpTestingController.verify();
  });

  it('should display the list of cities', async () => {
    const departmentReq = httpTestingController.expectOne('https://geo.api.gouv.fr/departements/14');
    departmentReq.flush(mockDepartments[0]);

    const citiesReq = httpTestingController.expectOne('https://geo.api.gouv.fr/departements/14/communes');
    citiesReq.flush(mockCities);

    await harness.fixture.whenStable();
    harness.detectChanges();

    const list = harness.routeDebugElement!.query(By.css('[data-test-id="city-list-container"]'));
    expect(list).toBeTruthy();
    expect(list.children.length).toBeGreaterThan(0);

    httpTestingController.verify();
  });
});
