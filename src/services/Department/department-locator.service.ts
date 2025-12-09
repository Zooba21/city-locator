import { Department, ServiceUrls } from "@/types";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { Injectable, Signal } from "@angular/core";
import { BaseLocatorService } from "../BaseLocator";
import { DepartmentLocatorInterface } from "./department-locator.interface";

@Injectable({ providedIn: 'root' })
export default class DepartmentLocatorService extends BaseLocatorService<Department> implements DepartmentLocatorInterface<Department> {
  serviceUrl = ServiceUrls.DEPARTMENTS;

  findByRegion(regionCode: Signal<string>): HttpResourceRef<Department[] | undefined> {
    return httpResource<Department[]>(() => {
      const code = regionCode();
      if (! code || code === '') {
        return undefined;
      }
      return code != '' ? this.apiUrl + `/regions/${code}/departements` : undefined;
    });
  }
}
