import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HttpError} from '../models/http-error';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    let err = error.error;
    if (typeof error.error === 'string') {
      err = JSON.parse(error.error);
    }

    const responseError: HttpError = {
      message: error.message,
      status: error.status,
      statusText: error.statusText,
      errorCode: err.errorCode
    };

    if (error.status === 0) {
      responseError.errorCode = 'Unknown Error';
    }

    return throwError(responseError);
  }

}
