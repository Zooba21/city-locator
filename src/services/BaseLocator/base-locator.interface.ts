import { ServiceUrls } from "@/types";
import { HttpResourceRef } from "@angular/common/http";

export interface BaseLocatorServiceInterface<T> {
  serviceUrl: ServiceUrls;
  apiUrl: string;

  findOne(code: string): HttpResourceRef<T | undefined>;
  findAll(): HttpResourceRef<T[] | undefined>;
}
