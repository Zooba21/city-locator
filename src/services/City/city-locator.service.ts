import { type CityLocatorInterface } from "@/services/City";
import { City, ServiceUrls } from "@/types";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseLocatorService } from "../BaseLocator";

@Injectable({ providedIn: "root" })
export default class CityLocatorService extends BaseLocatorService<City> implements CityLocatorInterface {
  serviceUrl = ServiceUrls.DEPARTMENTS;

  findByDepartment(departmentCode: string): HttpResourceRef<City[] | undefined> {
    return httpResource(() => {
      if (departmentCode === '') {
        return undefined;
      }
      return `${this.apiUrl}/${this.serviceUrl}/${departmentCode}/communes`
    });
  }
}
