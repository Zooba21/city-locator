
import { Region, ServiceUrls } from "@/types";
import { Injectable } from "@angular/core";
import { BaseLocatorService } from "../BaseLocator";

@Injectable({ providedIn: 'root' })
export default class RegionLocatorService extends BaseLocatorService<Region> {
  serviceUrl = ServiceUrls.REGIONS;
}
