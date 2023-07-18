import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {AuthStorageService} from '../services';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private authStorageService: AuthStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokenRequest: any;

    return this.authStorageService.getTokenFromKeyCloak()
      .pipe(
        switchMap((token: any) => {
          if (token) {
            tokenRequest = req.clone({
              headers: req.headers.set('Authorization-token', token)
            });
          } else {
            return next.handle(req);
          }

          return next.handle(tokenRequest);
        }),
      );
  }
}
