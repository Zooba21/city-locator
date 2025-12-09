import { City } from "@/types";
import { HttpResourceRef } from "@angular/common/http";
import { Signal } from "@angular/core";
import { BaseLocatorServiceInterface } from "../BaseLocator";

export interface CityLocatorInterface extends BaseLocatorServiceInterface<City> {
  findByDepartment(departmentCode: string, cityName: Signal<string>): HttpResourceRef<City[] | undefined>;
}
