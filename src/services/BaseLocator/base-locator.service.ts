import { ServiceUrls } from "@/types";
import { httpResource, HttpResourceRef } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseLocatorServiceInterface } from "./base-locator.interface";
import { API_URL } from "@/app/tokens";


@Injectable({ providedIn: 'root' })
export default abstract class BaseLocatorService<T> implements BaseLocatorServiceInterface<T> {

  abstract serviceUrl: ServiceUrls;
  apiUrl: string = inject(API_URL);

  findOne(code: string): HttpResourceRef<T | undefined> {
    return httpResource<T>(() => {
      return this.apiUrl + `/${this.serviceUrl}/${code}`
    })
  };

  findAll(): HttpResourceRef<T[] | undefined> {
    return httpResource<T[]>(() => {
      return this.apiUrl + `/${this.serviceUrl}`
    })
  };
}
