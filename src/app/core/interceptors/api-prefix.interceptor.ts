import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@app/env';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Regex looks for URLs without "://", for example: /settings and /search
    // URLs with "://" will be excluded, for example: https://example.com/settings
    const isPortalService = /^(?!.*:\/\/).*\/search/.test(request.url);
    const isGetRegionsAndCitiesRequest = /^(?!.*:\/\/).*\/regions/.test(request.url);
    const isCustomerSiteService = /^(?!.*:\/\/).*\/settings/.test(request.url) || /^(?!.*:\/\/).*\/company/.test(request.url);
    const isAssetsRequest = /^(?!.*:\/\/).*\/assets/.test(request.url);

    if (isCustomerSiteService) {
      const url = `${environment.customerSiteServiceApiBaseURL}${request.url}`;
      request = request.clone({ url });
    } else if (isPortalService || isGetRegionsAndCitiesRequest) {
      const url = `${environment.portalServiceApiBaseURL}${request.url}`;
      request = request.clone({ url });
    }

    if (isAssetsRequest) {
      const url = `${environment.hostLink}${request.url}`;
      request = request.clone({ url });
    }

    return next.handle(request);
  }
}
