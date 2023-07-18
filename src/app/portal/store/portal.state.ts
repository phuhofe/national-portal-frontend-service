import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Action, State, StateContext, Store } from '@ngxs/store';

import { PortalPageActions } from './portal.actions';
import { PortalService } from '../services/portal.service';
import { TranslocoService } from '@ngneat/transloco';
import { Paging } from '@adstate_as/flora/lib/interfaces/paging';
import { OrderType } from '../models/order.model';

interface PortalStateType {
  orders: OrderType[];
  citiesRegions: {};
  isLoading: boolean;
  funeralHomeSetting: {};
  error: {};
  paging: Paging;
  sortItem: string;
  filter: any;
  regionsAndCities: [];
}

const state: { name: string; defaults: PortalStateType } = {
  name: 'portalPage',
  defaults: {
    orders: [],
    citiesRegions: {
      data: [
        {
          id: 0,
          name: 'All regions',
          cities: [
            {
              id: 0,
              name: 'All cities',
            },
          ],
        },
      ],
    },
    isLoading: false,
    funeralHomeSetting: {
      themeId: undefined,
      bannerURL: undefined,
      logoUrl: undefined,
    },
    error: {
      code: undefined,
      message: undefined,
    },
    paging: {
      currentPage: 0,
      pageSize: 50,
      totalPages: 0,
      totalElements: 0,
    },
    sortItem: null,
    filter: null,
    regionsAndCities: [],
  },
};
@State(state)
@Injectable()
export class PortalState {

  constructor(private portalService: PortalService, private store: Store, private translateService: TranslocoService) {}

  @Action(PortalPageActions.ChangePageSize)
  changePageSize(ctx: StateContext<PortalStateType>, action: PortalPageActions.ChangePageSize): void {
    const { paging } = ctx.getState();

    ctx.patchState({
      paging: {
        currentPage: paging.currentPage,
        pageSize: action.pageSize,
        totalPages: paging.totalPages,
        totalElements: paging.totalElements,
      },
    });
  }

  @Action(PortalPageActions.ChangePage)
  changePage(ctx: StateContext<PortalStateType>, action: PortalPageActions.ChangePage): Observable<any> {
    const { paging } = ctx.getState();
    if (paging.pageSize === action.pageSize && paging.currentPage === action.currentPage) {
      return;
    }
    const sortItem = ctx.getState().sortItem;
    const filterValue = ctx.getState().filter;

    ctx.patchState({ isLoading: true });
    return this.portalService.changePage(action.searchData, action.pageSize, action.currentPage, sortItem, filterValue).pipe(
      map((response: any) => {
        if (response) {
          ctx.patchState({
            orders: this.portalService.mapOrderData(response.content),
            filter: filterValue,
            paging: {
              currentPage: response.pageable.pageNumber,
              pageSize: response.pageable.pageSize,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            },
            isLoading: false,
          });
          return this.store.dispatch(new PortalPageActions.UpdatePassingCardTranslations(action.locale));
        }
      }),
      catchError((error) => {
        return this.store.dispatch(new PortalPageActions.GetUsersFailed(error.errorCode ?? 'unknown', error.message ?? 'un-know'));
      })
    );
  }

  @Action(PortalPageActions.Search)
  search(ctx: StateContext<PortalStateType>, action: PortalPageActions.Search): Observable<any> {
    ctx.patchState({ isLoading: true });
    const { paging } = ctx.getState();
    const sortItem = ctx.getState().sortItem;
    const filterValue = ctx.getState().filter;

    return this.portalService.search(action.searchData, paging.pageSize, sortItem, filterValue).pipe(
      map((response: any) => {
        if (response) {
          ctx.patchState({
            orders: this.portalService.mapOrderData(response.content),
            filter: filterValue,
            paging: {
              currentPage: response.pageable.pageNumber,
              pageSize: response.pageable.pageSize,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            },
            isLoading: false,
          });
          return this.store.dispatch(new PortalPageActions.UpdatePassingCardTranslations(action.locale));
        }
      }),
      catchError((error) => {
        ctx.patchState({ isLoading: false });
        return this.store.dispatch(new PortalPageActions.GetUsersFailed(error.errorCode ?? 'unknown', error.message ?? 'un-know'));
      })
    );
  }

  @Action(PortalPageActions.GetUsersFailed)
  getUsersFailed(ctx: StateContext<PortalStateType>, action: PortalPageActions.GetUsersFailed): void {
    ctx.patchState({
      orders: [],
      isLoading: false,
      error: { code: action.errorCode, message: action.message },
    });
  }

  @Action(PortalPageActions.UpdatePassingCardTranslations)
  updatePassingCardTranslations(ctx: StateContext<PortalStateType>, action: PortalPageActions.UpdatePassingCardTranslations): void {
    const { orders } = ctx.getState();
    const memorialPageTranslationKey = 'portalPage.searchResult.service.memorialPage';
    const donationTranslationKey = 'portalPage.searchResult.service.donation';
    const deathNoticeTranslationKey = 'portalPage.searchResult.service.deathNotice';
    const flowerShopTranslationKey = 'portalPage.searchResult.service.flowerShop';

    ctx.patchState({
      orders: orders.map((order: any) => {
        const newOrder = JSON.parse(JSON.stringify(order));
        const locale = action.language.replace('_', '-');
        const birthDateTimeFormat: Intl.DateTimeFormatOptions = { year: 'numeric' };
        const deathDateTimeFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let ceremonyDateTimeFormat: Intl.DateTimeFormatOptions = {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        };

        newOrder.services.memorialPage.label = this.translateService.translate(memorialPageTranslationKey, {}, action.language);
        newOrder.services.donation.label = this.translateService.translate(donationTranslationKey, {}, action.language);
        newOrder.services.deathNotice.label = this.translateService.translate(deathNoticeTranslationKey, {}, action.language);
        newOrder.services.flowerShop.label = this.translateService.translate(flowerShopTranslationKey, {}, action.language);

        // Handle birthdate
        if (newOrder.person && newOrder.person.birthdate) {
          if (!newOrder.person.birthdateOriginal) {
            newOrder.person.birthdateOriginal = order.person.birthdate;
          }

          try {
            const dateTime = new Date(newOrder.person.birthdateOriginal);
            newOrder.person.birthdate = dateTime.toLocaleDateString(locale, birthDateTimeFormat);
          } catch (error) {
            console.error(`Couldn't format birthdate`, error, locale);
          }
        }

        // Handle deathdate
        if (newOrder.person && newOrder.person.deathdate) {
          if (!newOrder.person.deathdateOriginal) {
            newOrder.person.deathdateOriginal = order.person.deathdate;
          }

          try {
            const dateTime = new Date(newOrder.person.deathdateOriginal);
            newOrder.person.deathdate = dateTime.toLocaleDateString(locale, deathDateTimeFormat);
          } catch (error) {
            console.error(`Couldn't format death date`, error, locale);
          }
        }

        // Handle ceremony date
        if (newOrder.ceremony && newOrder.ceremony.dateTime) {
          if (!newOrder.ceremony.dateTimeOriginal) {
            newOrder.ceremony.dateTimeOriginal = order.ceremony.dateTime;
          }

          if (newOrder.ceremony.hideCeremonyDate) {
            ceremonyDateTimeFormat = { year: 'numeric' };
          }

          try {
            const dateTime = new Date(newOrder.ceremony.dateTimeOriginal);
            newOrder.ceremony.dateTime = dateTime.toLocaleDateString(locale, ceremonyDateTimeFormat);
          } catch (error) {
            console.error(`Couldn't format ceremony date`, error, locale);
          }
        }

        return newOrder;
      }),
    });
  }

  @Action(PortalPageActions.SortItems)
  sortItems(ctx: StateContext<any>, action: PortalPageActions.SortItems): Observable<any> {
    const { paging } = ctx.getState();
    const filterValue = ctx.getState().filter;

    ctx.patchState({ isLoading: true });
    return this.portalService.sortItems(action.searchData, action.sort, paging, filterValue).pipe(
      map((response: any) => {
        if (response) {
          ctx.patchState({
            orders: this.portalService.mapOrderData(response.content),
            paging: {
              currentPage: response.pageable.pageNumber,
              pageSize: response.pageable.pageSize,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            },
            sortItem: action.sort,
            isLoading: false,
          });
          return this.store.dispatch(new PortalPageActions.UpdatePassingCardTranslations(action.locale));
        }
      }),
      catchError((error) => {
        return this.store.dispatch(new PortalPageActions.GetUsersFailed(error.errorCode ?? 'unknown', error.message ?? 'un-know'));
      })
    );
  }

  @Action(PortalPageActions.GetRegionsAndCities)
  getRegionsAndCities(ctx: StateContext<any>, action: PortalPageActions.GetRegionsAndCities): Observable<any> {
    const region = {
      id: 0,
      name: this.translateService.translate('portalPage.filter.allRegions', {}, action.locale),
      cities: [
        {
          id: 0,
          name: this.translateService.translate('portalPage.filter.allCities', {}, action.locale),
        },
      ],
    };

    return this.portalService.getRegionsAndCities(action.domain).pipe(
      map((response: any) => {
        if (response) {
          response.unshift(region);
          ctx.patchState({
            regionsAndCities: {
              data: response,
            },
          });
        }
      }),
      catchError((error) => {
        return this.store.dispatch(new PortalPageActions.GetUsersFailed(error.errorCode ?? 'unknown', error.message ?? 'un-know'));
      })
    );
  }

  @Action(PortalPageActions.Filter)
  filter(ctx: StateContext<any>, action: PortalPageActions.Filter): Observable<any> {
    const { paging } = ctx.getState();
    const { sortItem } = ctx.getState();

    ctx.patchState({
      isLoading: true,
      orders: [],
    });

    return this.portalService.filter(action.searchData, action.filter, sortItem, paging).pipe(
      map((response: any) => {
        if (response) {
          ctx.patchState({
            orders: this.portalService.mapOrderData(response.content),
            paging: {
              currentPage: response.pageable.pageNumber,
              pageSize: response.pageable.pageSize,
              totalPages: response.totalPages,
              totalElements: response.totalElements,
            },
            sortItem,
            isLoading: false,
            filter: action.filter,
          });
          return this.store.dispatch(new PortalPageActions.UpdatePassingCardTranslations(action.locale));
        }
      }),
      catchError((error) => {
        return this.store.dispatch(new PortalPageActions.GetUsersFailed(error.errorCode ?? 'unknown', error.message ?? 'un-know'));
      })
    );
  }

  @Action(PortalPageActions.UpdateFilter)
  updateFilter(ctx: StateContext<any>, action: PortalPageActions.UpdateFilter): Observable<any> {
    return ctx.patchState({
      filter: action.filter,
    });
  }
}
