import { HttpResourceRef } from "@angular/common/http";
import { Signal } from "@angular/core";
import { BaseLocatorServiceInterface } from "../BaseLocator";

export interface DepartmentLocatorInterface<Department> extends BaseLocatorServiceInterface<Department> {
  findByRegion(regionCode: Signal<string>): HttpResourceRef<Department[] | undefined>;
}
