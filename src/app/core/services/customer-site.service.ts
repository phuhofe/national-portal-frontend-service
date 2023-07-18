import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fallbackSiteSettings } from '@app/core/content/fallback-site-settings';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationActions } from 'src/app/store/application.actions';
import {
  CustomerSiteServiceAnalyticsResponse,
  CustomerSiteServiceSettingsCompany,
  CustomerSiteServiceSettingsResponse,
} from '../interface/customer-service.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomerSiteService {
  private endpoints = {
    getAnalyticsIds: '/v1/company/{{companyId}}/analytics',
    getSiteSettings: '/v1/settings',
  };

  constructor(private http: HttpClient, private store: Store) {}

  getSettings(companySlug: string): Observable<CustomerSiteServiceSettingsResponse> {
    let params = new HttpParams();
    params = params.append('companyName', companySlug);

    return this.http.get<CustomerSiteServiceSettingsResponse>(this.endpoints.getSiteSettings, { params }).pipe(
      catchError((error) => {
        this.store.dispatch(new ApplicationActions.NotFound(true));
        throwError(error);

        return this.getFallbackSiteSettings();
      })
    );
  }

  getAnalytics(companyId: CustomerSiteServiceSettingsCompany['id']): Promise<CustomerSiteServiceAnalyticsResponse> {
    return new Promise((resolve, reject) => {
      this.http
        .get(this.endpoints.getAnalyticsIds.replace('{{companyId}}', companyId.toString()))
        .toPromise()
        .then((response: CustomerSiteServiceAnalyticsResponse) => {
          resolve(response);
        })
        .catch((error) => {
          console.error('Could not get analytics', error);
          reject();
        });
    });
  }

  getFallbackSiteSettings(): Observable<any> {
    return new BehaviorSubject(fallbackSiteSettings);
  }
}
