import { CityLocatorService, DepartmentLocatorService } from '@/services';
import { Department } from '@/types';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-city-locator',
  templateUrl: './city-locator.html',
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ]
})
export class CityLocator {

  private route = inject(ActivatedRoute);
  cityLocator = inject(CityLocatorService);
  departmentLocator = inject(DepartmentLocatorService);
  cityName = new FormControl<string>('', {nonNullable: true });
  cityNameSignal = toSignal(this.cityName.valueChanges.pipe(
    tap(() => {
      if (this.currentPage() !== 1) {
        this.currentPage.set(1);
      }
    })
  ), {initialValue: ''});
  departmentCode = this.route.snapshot.paramMap.get('departmentCode') || '';
  departmentResource = this.departmentLocator.findOne(this.departmentCode);
  currentPage = signal<number>(1);
  itemsPerPage = signal(30);

  department = computed<Department|null>(() => {
    const department = this.departmentResource.value();
    return department || null;
  })

  $citiesResource = this.cityLocator.findByDepartment(this.departmentCode);

  cityListPaginated = computed(() => {
    const cities = this.cityList();
    const currentPage = this.currentPage();
    return cities.slice((currentPage - 1) * this.itemsPerPage(), currentPage * this.itemsPerPage()) || [];
  })

  maxPage = computed(() => {
    const total = this.cityList().length || 0;
    return Math.ceil(total / this.itemsPerPage());
  })

  clearCityName() {
    this.cityName.setValue('');
  }

  private cityList = computed(() => {
    const cities = this.$citiesResource.value();
    const cityName = this.cityNameSignal();
    return cities?.filter(city => city.nom.toLowerCase().includes(cityName.toLowerCase())) || [];
  })
}
