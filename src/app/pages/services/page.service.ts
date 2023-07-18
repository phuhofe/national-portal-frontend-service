import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { PageTranslation } from '../models/page.model';
@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(private translateService: TranslocoService, private http: HttpClient) {}

  getPageTranslation(activePage: string): Observable<PageTranslation> {
    const pageURL = `${environment.apiGatewayURL}/api/web/data-platform/v1/items/portal_page/${activePage}?fields=slug,translations.*`;
    const listenToObservables = [this.translateService.langChanges$, this.http.get(pageURL)];

    const observableContent$: Observable<PageTranslation> = new Observable((subscriber) => {
      subscriber.next({
        title: null,
        content: null,
        loading: true,
        error: false,
      });

      combineLatest(listenToObservables).subscribe({
        next(value: [string, { data: { translations } }]): void {
          const activeLanguage = value[0];
          const translatedPage = value[1].data.translations.find((item) => item.languages_id === activeLanguage);

          subscriber.next({
            ...translatedPage,
            loading: false,
            error: false,
          });
        },
        error(err): void {
          subscriber.next({
            title: 'pageTemplate.contentNotBeAbleToLoad.title',
            content: 'pageTemplate.contentNotBeAbleToLoad.content',
            loading: false,
            error: true,
          });
        },
      });
    });

    return observableContent$;
  }
}
