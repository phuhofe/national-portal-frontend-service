import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@app/env';
import * as language_en_GB from '../../assets/locale/en_GB.json';

@Injectable({ providedIn: 'root' })
export class TranslocoLoaderService implements TranslocoLoader {

  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<Translation> | Promise<Translation> {
    return this.http
      .get(`${environment.lokaliseStorageURL}/locale/${lang}.json`)
      .pipe(catchError(() => {
        const language = Object(language_en_GB).default;
        return of(language);
      }));
  }
}
