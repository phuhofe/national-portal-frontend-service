import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { environment } from '@app/env';
import { NationalPortalCompanyName } from '@app/config';
import { SeoService } from '@app/core/services/seo.service';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { ApplicationSelectors } from 'src/app/store/application.selectors';
import { ApplicationStateModel } from 'src/app/store/application.state';
import { Destroyable, DestroyableComponent, takeUntilDestroyed } from '@app/core/destroyable';
import { filter, map, switchMap } from 'rxjs/operators';
import { PageService } from '../../services/page.service';
interface PageData {
  i18nPrefix: string;
  content?: string;
  seoCanonicalUrl?: string;
  title?: string;
  loading?: boolean;
  error?: boolean;
}

@Destroyable()
@Component({
  selector: 'app-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
})
export class PageTemplateComponent extends DestroyableComponent implements OnInit, OnDestroy {
  @Input() isStaticPage = false;
  @Input() includeDefaultPageElements = true;

  @Select(ApplicationSelectors.currentReadyLanguage) currentReadyLanguage$: Observable<ApplicationStateModel['currentReadyLanguage']>;
  @Select(ApplicationSelectors.notFound) notFound$: Observable<boolean>;

  translations$: Observable<any>;
  applicationIsEmbedded = environment.exportPortalComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslocoService,
    private seoService: SeoService,
    private pageService: PageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.notFound$.subscribe((status) => {
      if (status) {
        const activePage = '404';
        this.translations$ = this.pageService.getPageTranslation(activePage);
      } else {
        this.translations$ = this.activatedRoute.data.pipe(
          filter((dataResolver) => !!dataResolver?.data?.content),
          switchMap((dataResolver) => dataResolver.data.content),
          map((data: PageData) => ({
            title: data.title,
            content: data.content,
            isLoading: data.loading,
            isError: data.error,
          }))
        );
      }
    });

    this.activatedRoute.data.subscribe((data: PageData) => {
      if (Object.keys(data).length === 0) {
        data = { i18nPrefix: 'notFoundPage', content: 'notFoundPage.content' };
      } else {
        this.setupSEO(data);
      }
    });
  }

  ngOnDestroy(): void {
    this.removeSEO();
  }

  removeSEO(): void {
    this.seoService.setMetaTag({
      name: 'description',
      content: null,
    });

    this.seoService.setLinkTag({
      id: 'seo-canonical-tag',
      rel: 'canonical',
      href: null,
    });
  }

  setupSEO(pageData: PageData): void {
    this.currentReadyLanguage$.pipe(takeUntilDestroyed(this.componentDestroyed$)).subscribe((currentReadyLanguage) => {
      if (currentReadyLanguage) {
        const seoTitleKey = `${pageData.i18nPrefix}.meta.title`;
        const translatedSeoTitle = this.translateService.translate(seoTitleKey);
        if (seoTitleKey === translatedSeoTitle) {
          const fallbackTranslation = this.translateService.translate('page.fallbackMeta.title');
          this.seoService.setTitleTag(fallbackTranslation);
          this.seoService.setMetaTag({ property: 'og:title', content: fallbackTranslation });
        } else {
          this.seoService.setTitleTag(translatedSeoTitle);
          this.seoService.setMetaTag({ property: 'og:title', content: translatedSeoTitle });
        }

        const seoDescriptionKey = `${pageData.i18nPrefix}.meta.description`;
        const translatedSeoDescription = this.translateService.translate(seoDescriptionKey);
        if (seoDescriptionKey === translatedSeoDescription) {
          const fallbackTranslation = this.translateService.translate('page.fallbackMeta.description');
          this.seoService.setMetaTag({ name: 'description', content: fallbackTranslation });
          this.seoService.setMetaTag({ property: 'og:description', content: fallbackTranslation });
        } else {
          this.seoService.setMetaTag({ name: 'description', content: translatedSeoDescription });
          this.seoService.setMetaTag({ property: 'og:description', content: translatedSeoDescription });
        }
      }

      let canonicalPath = `/${NationalPortalCompanyName}`;
      if (this.activatedRoute.routeConfig) {
        canonicalPath += `/pages/${this.activatedRoute.routeConfig.path}`;
      }

      if (pageData.seoCanonicalUrl) {
        canonicalPath = pageData.seoCanonicalUrl;
      }

      this.seoService.setLinkTag({
        id: 'seo-canonical-tag',
        rel: 'canonical',
        href: `${environment.hostLink}${canonicalPath}`,
      });
    });
  }
}
