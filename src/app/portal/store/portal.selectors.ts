import { environment } from '@app/env';
import { Selector } from '@ngxs/store';
import { PortalState } from './portal.state';

export class PortalPageSelectors extends PortalState {
  @Selector()
  static orders(state): any {
    return state.orders.map((order) => {
      return {
        ...order,
        person: {
          ...order.person,
          birthdate: order.person.birthdate ? order.person.birthdate : order.person.birthYear,
          deathdate: order.person.deathdate ? order.person.deathdate : order.person.deathYear,
          nameAndPhotoLink: environment.memorialPageDynamicLink + order.id,
        },
      };
    });
  }

  @Selector()
  static isLoading(state): boolean {
    return state.isLoading;
  }

  @Selector()
  static paging(state): any {
    return state.paging;
  }

  @Selector()
  static funeralHomeSetting(state): any {
    return state.funeralHomeSetting;
  }

  @Selector()
  static citiesAndRegions(state): any {
    return state.citiesRegions;
  }

  @Selector()
  static errorCode(state): any {
    return state.error.code;
  }

  @Selector()
  static errorMessage(state): any {
    return state.error.message;
  }

  @Selector()
  static regionsAndCities(state): any {
    return state.regionsAndCities;
  }

  @Selector()
  static sortItems(state): any {
    return state.sortItems;
  }
}
