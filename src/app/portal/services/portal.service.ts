import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { SearchRequest } from '../interface/search-request.interface';
import { Observable } from 'rxjs';
import { Paging } from '../models/paging.model';
import { OrderType } from '../models/order.model';
import * as PORTAL_CONSTANT from '../constants/portal.constants';
import { TrackingService } from 'src/app/settings/services/tracking.service';

@Injectable({
  providedIn: 'root',
})
export class PortalService {
  private endpoints = {
    getMemorialPages: '/v2/search',
    getRegions: '/v1/regions',
  };

  constructor(private http: HttpClient, private translateService: TranslocoService, private trackingService: TrackingService) {}

  changePage(searchData: SearchRequest, pageSize: number, currentPage: number, sortValue: string, filterValue: any): Observable<any> {
    let params = new HttpParams();

    params = this.addPaginationToParameters(params, currentPage.toString(), pageSize.toString());
    params = this.addSearchDataToParameters(params, searchData);
    params = this.addFilterValueToParameters(params, filterValue);

    if (sortValue) {
      params = params.append(PORTAL_CONSTANT.ORDER_BY, sortValue);
    }

    return this.http.get(this.endpoints.getMemorialPages, { params });
  }

  search(searchData: SearchRequest, pageSize: number, sortValue: string, filterValue: any): Observable<any> {
    let params = new HttpParams();

    params = this.addPaginationToParameters(params, PORTAL_CONSTANT.DEFAULT_PAGE, pageSize.toString());
    params = this.addSearchDataToParameters(params, searchData);
    params = this.addFilterValueToParameters(params, filterValue);

    if (sortValue) {
      params = params.append(PORTAL_CONSTANT.ORDER_BY, sortValue);
    }

    const allSearchTerms = params.getAll(PORTAL_CONSTANT.SEARCH_TERMS);
    const weHaveAnySearchTerms = allSearchTerms !== null;
    if (weHaveAnySearchTerms) {
      const allSearchTermsAsString = allSearchTerms.join(' ');
      this.trackingService.onTrackSiteSearch(allSearchTermsAsString);
    }

    return this.http.get(this.endpoints.getMemorialPages, { params });
  }

  mapOrderData(data: any): OrderType[] {
    return data.map((order): OrderType => {
      return {
        id: order.id,
        person: {
          firstName: order.firstName,
          lastName: order.lastName,
          birthdate: order.birthDate,
          birthYear: order.birthYear,
          deathdate: order.deathDate,
          deathYear: order.deathYear,
          deathcity: order.deathCity,
          photoUrl: order.photoUrl,
        },
        services: {
          memorialPage: {
            disabled: order.services.memorialPage.length === 0,
            url: order.services.memorialPage,
            label: this.translateService.translate('portalPage.searchResult.service.memorialPage'),
          },
          donation: {
            disabled: order.services.donation.length === 0,
            url: order.services.donation,
            label: this.translateService.translate('portalPage.searchResult.service.donation'),
          },
          flowerShop: {
            disabled: order.services.flowerShop.length === 0,
            url: order.services.flowerShop,
            label: this.translateService.translate('portalPage.searchResult.service.flowerShop'),
          },
          deathNotice: {
            disabled: order.services.deathNotice.length === 0,
            url: order.services.deathNotice,
            label: this.translateService.translate('portalPage.searchResult.service.deathNotice'),
          },
        },
        ceremony: {
          dateTime: order.ceremony.dateTime,
          location: order.ceremony.location,
          hideCeremonyDate: !!order.hideCeremonyDate ?? false,
        },
      };
    });
  }

  sortItems(searchData: SearchRequest, sortValue: string, paging: Paging, filterValue: any): Observable<any> {
    let params = new HttpParams();

    params = this.addPaginationToParameters(params, paging.currentPage.toString(), paging.pageSize.toString());
    params = params.append(PORTAL_CONSTANT.ORDER_BY, sortValue);
    params = this.addSearchDataToParameters(params, searchData);
    params = this.addFilterValueToParameters(params, filterValue);

    return this.http.get(this.endpoints.getMemorialPages, { params });
  }

  getRegionsAndCities(domain: string): Observable<any> {
    let params = new HttpParams();

    if (!domain) {
      throw new Error('Domain missing');
    }

    params = params.append(PORTAL_CONSTANT.DOMAIN, domain);

    return this.http.get(this.endpoints.getRegions, { params });
  }

  filter(searchData: SearchRequest, filterValue: any, sortValue: string, paging: Paging): Observable<any> {
    let params = new HttpParams();

    params = this.addPaginationToParameters(params, PORTAL_CONSTANT.DEFAULT_PAGE, paging.pageSize.toString());
    if (sortValue) {
      params = params.append(PORTAL_CONSTANT.ORDER_BY, sortValue);
    }
    params = this.addSearchDataToParameters(params, searchData);
    params = this.addFilterValueToParameters(params, filterValue);

    return this.http.get(this.endpoints.getMemorialPages, { params });
  }

  addSearchDataToParameters(params: HttpParams, searchData: SearchRequest): HttpParams {
    params = params.append(PORTAL_CONSTANT.DOMAIN, searchData.searchDomain);
    params = params.append(PORTAL_CONSTANT.AREA, searchData.searchArea);
    searchData.searchTerms.forEach((searchTerm) => {
      params = params.append(PORTAL_CONSTANT.SEARCH_TERMS, searchTerm);
    });

    return params;
  }

  addPaginationToParameters(params: HttpParams, page: string, size: string): HttpParams {
    params = params.append(PORTAL_CONSTANT.PAGE, page);
    params = params.append(PORTAL_CONSTANT.SIZE, size);

    return params;
  }

  addFilterValueToParameters(params: HttpParams, filterValue: any): HttpParams {
    if (!filterValue) {
      return params;
    }
    Object.keys(filterValue).map((key) => {
      if (filterValue[key] || filterValue[key] === 0) {
        params = params.has(key) ? params : params.append(key, filterValue[key]);
      }
    });
    return params;
  }
}
