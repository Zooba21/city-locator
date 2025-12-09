import { DepartmentLocatorService, RegionLocatorService } from '@/services';
import { Region } from '@/types';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-region-locator',
  imports: [
    RouterModule,
    ReactiveFormsModule,
],
  templateUrl: './region-locator.html',
})
export class RegionLocator implements OnInit, OnDestroy {
  private keydownListener = this.handleKeydown.bind(this);
  private clickListener = this.handleClick.bind(this);

  ngOnInit() {
    window.addEventListener('keydown', this.keydownListener);
    window.addEventListener('click', this.clickListener);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.keydownListener);
    window.removeEventListener('click', this.clickListener);
  }

  regionLocator = inject(RegionLocatorService);
  departmentLocator = inject(DepartmentLocatorService);
  displayRegionList = signal(false);
  regionCode = signal<string>('');
  focusRegionIndex = signal<number|null>(null);
  regionName = new FormControl<string>('', {nonNullable: true});
  regionNameSignal = toSignal(this.regionName.valueChanges, {initialValue: ''});

  $regionsResource = this.regionLocator.findAll();
  $departmentResource = this.departmentLocator.findByRegion(this.regionCode);


  autoCompleteRegions = computed<Region[]>(() => {
    const input = this.regionNameSignal()
    const regions = this.$regionsResource.value();

    if (!regions) {
      return [];
    }

    if (!input) {
      return regions; // Show all regions when no input
    }

    return regions.filter(region => region.nom.toLowerCase().includes(input.toLowerCase()));
  })

  departmentList = computed(() => {
    const departments = this.$departmentResource.value();
    return departments || [];
  })

  handleKeyboardSignal = signal(false);
  setRegion(region: Region | null) {
    this.regionName.setValue(region?.nom ||'');
    this.regionCode.set(region?.code ?? '');
    this.displayRegionList.set(false);
    this.focusRegionIndex.set(null);
  }

  handleArrowDown() {
    if (!this.displayRegionList() && this.autoCompleteRegions().length > 0) {
      this.displayRegionList.set(true);
    }

    const currentIndex = this.focusRegionIndex();
    const nextIndex = currentIndex !== null ? currentIndex + 1 : 0;

    if (nextIndex < this.autoCompleteRegions().length) {
      this.focusRegionIndex.set(nextIndex);
      this.scrollRegionItemIntoView(nextIndex);
    }
  }

  handleArrowUp() {
    if (!this.displayRegionList() && this.autoCompleteRegions().length > 0) {
      this.displayRegionList.set(true);
    }

    const currentIndex = this.focusRegionIndex();
    const nextIndex = currentIndex !== null ? currentIndex - 1 : this.autoCompleteRegions().length - 1;

    if (nextIndex >= 0) {
      this.focusRegionIndex.set(nextIndex);
      this.scrollRegionItemIntoView(nextIndex);
    }
  }

  handleEnter() {
    const index = this.focusRegionIndex();
    if (index !== null) {
      const region = this.autoCompleteRegions()[index];
      if (region) {
        this.setRegion(region);
      }
    }
  }

  scrollRegionItemIntoView(index: number) {
    const regionItem = this.autoCompleteRegions()[index];
    if (regionItem) {
      const regionItemElement = document.querySelector(`.auto-complete__auto-complete-item:nth-child(${index + 1})`);
      if (regionItemElement) {
        regionItemElement.scrollIntoView({behavior: 'smooth', block: 'nearest'});
      }
    }
  }

  clearRegionInput() {
    this.regionName.setValue('');
    this.setRegion(null);
    this.displayRegionList.set(true);
    this.focusRegionIndex.set(null);
  }

  retryLoadingDepartments() {
    const currentRegionCode = this.regionCode();
    if (currentRegionCode) {
      this.regionCode.set(currentRegionCode);
    }
  }

  retryLoadingRegions() {
    // Force refresh of regions resource
    this.$regionsResource = this.regionLocator.findAll();
  }

    private handleKeydown(event: KeyboardEvent) {
    if (!this.displayRegionList()) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.handleArrowDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.handleArrowUp();
        break;
      case 'Enter':
        event.preventDefault();
        this.handleEnter();
        break;
      case 'Escape':
        this.displayRegionList.set(false);
        break;
    }
  }

  private handleClick(event: MouseEvent) {
    let target = event.target as HTMLElement;
    let isInsideAutocomplete = false;

    while (target) {
      if (target.classList.contains('auto-complete__auto-complete-list') ||
          target.classList.contains('auto-complete')) {
        isInsideAutocomplete = true;
        break;
      }
      target = target.parentElement as HTMLElement;
    }

    if (!isInsideAutocomplete && this.displayRegionList()) {
      this.displayRegionList.set(false);
    }
  }
}
