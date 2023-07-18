import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { PageService } from './page.service';

@Injectable({
  providedIn: 'root',
})
export class PageResolverService implements Resolve<any> {
  constructor(private pageService: PageService) {}

  resolve(route: ActivatedRouteSnapshot): { content: Observable<any> } {
    const activePage = route.routeConfig.data.content;

    return {
      content: this.pageService.getPageTranslation(activePage),
    };
  }
}
