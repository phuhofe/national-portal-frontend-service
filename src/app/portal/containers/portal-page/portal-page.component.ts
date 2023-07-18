import { PaginatorChangeEvent } from '@adstate_as/flora/lib/interfaces/paging';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { SettingsSelectors } from 'src/app/settings/store/settings.selectors';
import { environment } from '@app/env';
import { Paging } from '../../models/paging.model';
import { PortalPageActions } from '../../store/portal.actions';
import { PortalPageSelectors } from '../../store/portal.selectors';
import { SiteSettingsInterface } from 'src/app/settings/store/settings.state';
import { NationalPortalCompanyName, paginatorResultsPerPageOptions, TranslationLoadTypes } from '@app/config';
import { portalPageConfig, sortItemsTranslateHelper } from './portal-page-config';
import { ApplicationSelectors } from 'src/app/store/application.selectors';
import { ApplicationStateModel } from 'src/app/store/application.state';
import { SeoService } from '@app/core/services/seo.service';
import { Destroyable, DestroyableComponent, takeUntilDestroyed } from '@app/core/destroyable';
import { SearchRequest } from '../../interface/search-request.interface';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Destroyable()
@Component({
  selector: 'app-portal-page',
  templateUrl: './portal-page.component.html',
  styleUrls: ['./portal-page.component.scss'],
})
export class PortalPageComponent extends DestroyableComponent implements OnInit, OnDestroy {
  @Select(PortalPageSelectors.orders) orders$: Observable<any>;
  @Select(PortalPageSelectors.isLoading) isLoading$: Observable<boolean>;
  @Select(PortalPageSelectors.paging) paging$: Observable<Paging>;
  @Select(PortalPageSelectors.regionsAndCities) regionsAndCities$: Observable<any>;
  @Select(SettingsSelectors.displayBannerAttributes) displayBannerAttributes$: Observable<any>;
  @Select(SettingsSelectors.companySearchLayout) companySearchLayout$: Observable<any>;
  @Select(SettingsSelectors.availableSearchLocations) availableSearchLocations$: Observable<string[]>;
  @Select(SettingsSelectors.defaultSearchLocation) defaultSearchLocation$: Observable<string>;
  @Select(SettingsSelectors.initialSearch) initialSearch$: Observable<boolean>;
  @Select(SettingsSelectors.companyDomain) companyDomain$: Observable<any>;
  @Select(SettingsSelectors.siteLanguageSettings) siteLanguageSetting$: Observable<SiteSettingsInterface['siteLanguage']>;
  @Select(SettingsSelectors.emptySearchOn) emptySearchOn$: Observable<boolean>;
  @Select(SettingsSelectors.defaultPageSize) defaultPageSize$: Observable<number>;
  @Select(ApplicationSelectors.currentReadyLanguage) currentReadyLanguage$: Observable<ApplicationStateModel['currentReadyLanguage']>;
  @Select(SettingsSelectors.slugSettings) slugSettings$: Observable<any>;

  searchAreas: { label: string; value: string; isDefault: boolean; isSelected: boolean }[] = [];
  hostLink = environment.hostLink;
  locale: string;
  paginatorResultsPerPageOptions = paginatorResultsPerPageOptions;
  emptySearchOn: boolean;
  sortItems = [];
  TranslationLoadTypes = TranslationLoadTypes;
  shouldShowSearchResults = false;
  currentSearchInputValue = null;
  loadingSpinnerImage = portalPageConfig.loadingSpinnerImageUrl;
  currentReadyLanguageSubscription: Subscription = null;
  searchData: SearchRequest = {
    searchTerms: [],
    searchArea: '',
    searchDomain: '',
  };
  companyDomain: string;
  disableSearchButton: boolean;

  readonly LOCATION_NATIONAL = 'national';
  readonly SPACE_CHARACTER = ' ';

  constructor(private store: Store, private translateService: TranslocoService, private seoService: SeoService) {
    super();
  }

  ngOnInit(): void {
    this.siteLanguageSetting$.subscribe((locale) => (this.locale = locale.value));
    this.companyDomain$.subscribe((companyDomain) => {
      this.companyDomain = companyDomain;

      this.searchData = {
        ...this.searchData,
        searchDomain: this.companyDomain,
      };
    });
    this.setupSearchLocations();
    this.setupLanguageSwitching();
    this.setupDefaultPageSize();
    this.setupInitialSearch();
    this.setupSEO();
  }

  ngOnDestroy(): void {
    this.removeSEO();
  }

  onSearch(event: { searchLocation: string; selectedKeywords: string[]; forceAllowEmpty: boolean }): void {
    const searchValueIsEmpty = event.selectedKeywords.length === 0 && !event.forceAllowEmpty;
    const canPerformSearch = (searchValueIsEmpty && this.emptySearchOn) || !searchValueIsEmpty;
    this.checkDisableSearchButton(event.selectedKeywords);

    this.searchAreas = this.searchAreas.map((searchArea) => {
      return {
        ...searchArea,
        isSelected: searchArea.value === event.searchLocation,
      };
    });

    this.searchData = {
      searchDomain: this.companyDomain,
      searchTerms: event.selectedKeywords,
      searchArea: event.searchLocation,
    };
    this.currentSearchInputValue = event.selectedKeywords.join(this.SPACE_CHARACTER);
    if (canPerformSearch) {
      this.shouldShowSearchResults = true;
      this.store.dispatch(new PortalPageActions.Search(this.searchData, this.locale));
    }
  }

  onSearchInput(currentSearchValue: string | null): void {
    this.disableSearchButton = !currentSearchValue;
  }

  onPageChange(event: PaginatorChangeEvent): void {
    this.store.dispatch(new PortalPageActions.ChangePage(this.searchData, event.paging.pageSize, event.paging.currentPage, this.locale));
  }

  private setupSearchLocations(): void {
    this.availableSearchLocations$.subscribe((locations) => {
      this.searchAreas = [];
      locations.forEach((location) => {
        this.searchAreas.push({
          label: '',
          value: location,
          isDefault: false,
          isSelected: false,
        });
      });
    });

    this.defaultSearchLocation$.subscribe((location) => {
      const searchLocationThatShouldBeDefault = this.searchAreas.find((searchArea) => searchArea.value === location);
      if (searchLocationThatShouldBeDefault) {
        this.searchAreas.forEach((searchArea) => {
          searchArea.isDefault = false;
          searchArea.isSelected = false;
        });
        searchLocationThatShouldBeDefault.isDefault = true;
        searchLocationThatShouldBeDefault.isSelected = true;
        this.searchData = {
          ...this.searchData,
          searchArea: location,
        };
      }
    });
  }

  private getCurrentSearchLocation(): string {
    const currentSearchLocation = this.searchAreas.find((searchArea) => searchArea.isSelected);

    if (!currentSearchLocation) {
      console.warn('Initial search: Using backup search location');
      return this.LOCATION_NATIONAL;
    }

    return currentSearchLocation.value;
  }

  private setupInitialSearch(): void {
    combineLatest([this.initialSearch$, this.companyDomain$])
      .pipe(
        filter(([initialSearch, companyDomain]) => {
          return initialSearch && companyDomain;
        }),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.onSearch({
          searchLocation: this.getCurrentSearchLocation(),
          selectedKeywords: [],
          forceAllowEmpty: true,
        });
      });
  }

  private setupLanguageSwitching(): void {
    this.currentReadyLanguage$.pipe(takeUntilDestroyed(this.componentDestroyed$)).subscribe((currentReadyLanguage) => {
      if (currentReadyLanguage) {
        this.updateSearchAreasTranslations();
        this.updateSortItems();
        this.updatePassingCardTranslations(currentReadyLanguage);
        this.companyDomain$
          .pipe(filter((domain) => !!domain))
          .subscribe((domain) => {
            this.store.dispatch(new PortalPageActions.GetRegionsAndCities(domain, this.translateService.getActiveLang()));
          })
          .unsubscribe();
      }
    });
  }

  private setupDefaultPageSize(): void {
    this.defaultPageSize$.subscribe((defaultPageSize: number) => {
      this.paginatorResultsPerPageOptions = [...new Set([defaultPageSize, ...paginatorResultsPerPageOptions].sort((a, b) => a - b))];
      this.store.dispatch(new PortalPageActions.ChangePageSize(defaultPageSize));
    });
  }

  updateSortItems(): void {
    this.sortItems = sortItemsTranslateHelper(this.translateService);
  }

  updateSearchAreasTranslations(): void {
    this.searchAreas.forEach((searchArea) => {
      searchArea.label = this.translate('portalPage.searchBox.searchAreas.' + searchArea.value);
    });
  }

  updatePassingCardTranslations(newLanguage): void {
    this.store.dispatch(new PortalPageActions.UpdatePassingCardTranslations(newLanguage));
  }

  onFilter(data: any): void {
    if (data.isApply) {
      let allFiltersAreEmpty = true;
      for (const key in data) {
        if (allFiltersAreEmpty && Object.prototype.hasOwnProperty.call(data, key) && key !== 'isApply') {
          allFiltersAreEmpty = !data[key];
        }
      }

      if (!this.emptySearchOn && allFiltersAreEmpty) {
        return;
      }

      const selectedSearchArea = this.searchAreas.filter((searchArea) => searchArea.isSelected)[0];
      if (selectedSearchArea && selectedSearchArea.value) {
        data.area = selectedSearchArea.value;
      }

      this.companyDomain$.subscribe((domain) => (data.domain = domain)).unsubscribe();

      this.store.dispatch(new PortalPageActions.Filter(this.searchData, data, this.locale));
      this.shouldShowSearchResults = true;
      return;
    }

    this.store.dispatch(new PortalPageActions.UpdateFilter(data));
  }

  onClearFilter(): void {
    const data = {
      area: '',
      domain: '',
    };

    const selectedSearchArea = this.searchAreas.filter((searchArea) => searchArea.isSelected)[0];
    data.area = selectedSearchArea.value;

    this.companyDomain$.subscribe((domain) => (data.domain = domain)).unsubscribe();

    if (!this.currentSearchInputValue && !this.emptySearchOn) {
      return;
    }

    this.store.dispatch(new PortalPageActions.Filter(this.searchData, data, this.locale));
  }

  onSelectSort(sortValue: any): void {
    this.store.dispatch(new PortalPageActions.SortItems(this.searchData, sortValue, this.locale));
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

  setupSEO(): void {
    this.currentReadyLanguage$.subscribe((currentReadyLanguage) => {
      if (currentReadyLanguage) {
        const portalPageMetaTitle = 'portalPage.meta.title';
        const portalPageMetaDescriptionKey = 'portalPage.meta.description';
        const portalPageMetaDescriptionTitle = 'description';
        const seoCanonicalTag = 'seo-canonical-tag';
        const seoRel = 'canonical';

        const metaTag = {
          title: portalPageMetaTitle,
          name: portalPageMetaDescriptionTitle,
          content: portalPageMetaDescriptionKey,
          id: seoCanonicalTag,
          rel: seoRel,
        };

        this.seoService.setTitleTag(this.translate(metaTag.title));
        this.seoService.setMetaTag({
          name: metaTag.name,
          content: this.translate(metaTag.content),
        });

        this.slugSettings$
          .subscribe((currentSlug) => {
            let canonicalUrl = `${environment.hostLink}`;

            if (currentSlug.value !== NationalPortalCompanyName) {
              canonicalUrl += `/${currentSlug.value}`;
            }

            this.seoService.setLinkTag({
              id: metaTag.id,
              rel: metaTag.rel,
              href: canonicalUrl,
            });
          })
          .unsubscribe();
      }
    });
  }

  translate(translateString: string): string {
    return this.translateService.translate(translateString);
  }

  checkDisableSearchButton(keywords: string[]): void {
    this.emptySearchOn$.subscribe((emptySearchOn: boolean) => {
      this.emptySearchOn = emptySearchOn;
      if (this.emptySearchOn) {
        this.disableSearchButton = false;
        return;
      }

      if (!this.emptySearchOn && keywords.length === 0) {
        this.disableSearchButton = true;
        return;
      }

      this.disableSearchButton = false;
    });
  }
}
