import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@app/env';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { PageTranslation } from '../models/page.model';
@Injectable({
  providedIn: 'root',
})
export class CustomPageService {
  constructor(private translateService: TranslocoService, private http: HttpClient) {}

  getPageById(activePage: string): Observable<PageTranslation> {
    const pageURL = `${environment.apiGatewayURL}/api/web/data-platform/v1/items/custom_page/${activePage}?fields=content.*,content.item.*`;
    // const listenToObservables = [this.translateService.langChanges$, this.http.get(pageURL)];
    const listenToObservables = [this.http.get(pageURL)];

    const observableContent$: Observable<PageTranslation> = new Observable((subscriber) => {
      subscriber.next({
        title: null,
        content: null,
        loading: true,
        error: false,
      });

      combineLatest(listenToObservables).subscribe({
        next(value: [{ data: { content: any } }]): void {
          subscriber.next({
            title: null,
            content: value[0].data.content,
            loading: false,
            error: false,
          });
        },
        error(err): void {
          subscriber.next({
            title: 'pageTemplate.contentNotBeAbleToLoad.title',
            content: 'pageTemplate.contentNotBeAbleToLoad.content',
            loading: false,
            error: false, // TODO: Change to true when BE is ready
          });
        },
      });
    });

    return observableContent$;
  }
}
