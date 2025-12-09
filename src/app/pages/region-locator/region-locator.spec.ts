import { mockDepartments, mockRegions } from '@/testing/test-data';
import { HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getCommonTestProviders } from '../../../testing/test-providers';

import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { RegionLocator } from './region-locator';

describe('RegionLocator', () => {
  let component: RegionLocator;
  let fixture: ComponentFixture<RegionLocator>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionLocator],
      providers: getCommonTestProviders()
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegionLocator);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    const regionsReq = httpTestingController.expectOne('https://geo.api.gouv.fr/regions');
    expect(regionsReq.request.method).toBe('GET');
    regionsReq.flush(mockRegions);

    expect(component).toBeTruthy();

    httpTestingController.verify();
  });

  it('should show the list of region when clicking on a region, and then departments when selecting a region', async () => {
    const regionsReq = httpTestingController.expectOne('https://geo.api.gouv.fr/regions');
    regionsReq.flush(mockRegions);

    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.autoCompleteRegions().length).toBeGreaterThan(0);

    const input = fixture.debugElement.query(By.css('[data-test-id="region-autocomplete-input"]'));
    input.triggerEventHandler('focus', null);
    fixture.detectChanges();

    expect(component.displayRegionList()).toBe(true);

    const list = fixture.debugElement.query(By.css('.auto-complete__auto-complete-list'));
    expect(list).toBeTruthy();
    expect(list.nativeElement.classList).toContain('active');

    const regionItem = list.query(By.css('[data-test-id="region-autocomplete-list-container"] li:nth-child(1)'));
    expect(regionItem).toBeTruthy();

    regionItem.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(component.displayRegionList()).toBe(false);

    const departmentsReq = httpTestingController.expectOne('https://geo.api.gouv.fr/regions/28/departements');
    departmentsReq.flush(mockDepartments);

    await fixture.whenStable();
    fixture.detectChanges();

    const departmentList = fixture.debugElement.query(By.css('[data-test-id="department-list-container"]'));
    expect(departmentList.children.length).toBeGreaterThan(0);

    const departmentLink = departmentList.children[0].query(By.directive(RouterLink));

    expect(departmentLink).toBeTruthy();
    const link = departmentLink.injector.get(RouterLink);
    expect(link).toBeTruthy();

    const href = departmentLink.nativeElement.getAttribute('href');
    expect(href).toBe('/14');


    httpTestingController.verify();
  });
});
