import { SearchRequest } from '../interface/search-request.interface';

export namespace PortalPageActions {
  export class Search {
    static readonly type = '[PortalPage] Search users';
    constructor(public searchData: SearchRequest, public locale: string, public size = 50, public page = 0) {}
  }

  export class ChangePage {
    static readonly type = '[PortalPage] Change page';
    constructor(public searchData: SearchRequest, public pageSize: number, public currentPage: number, public locale: string) {}
  }

  export class ChangePageSize {
    static readonly type = '[PortalPage] Change page size';
    constructor(public pageSize: number) {}
  }

  export class GetUsersFailed {
    static readonly type = '[PortalPage] Get users failed';
    constructor(public errorCode: string, public message: string) {}
  }

  export class GetRegionsAndCities {
    static readonly type = '[PortalPage] Get regions and cities';
    constructor(public domain: string, public locale: string) {}
  }

  export class GetRegionsAndCitiesFail {
    static readonly type = '[PortalPage] Get regions and citties failed';
  }

  export class GetFuneralHomeSettings {
    static readonly type = '[PortalPage] Get user settings';
    constructor(public id: number) {}
  }

  export class GetFuneralHomeSettingsFail {
    static readonly type = '[PortalPage] Get user settings failed';
    constructor(public id: number) {}
  }

  export class UpdatePassingCardTranslations {
    static readonly type = '[PortalPage] Update icon label translation';
    constructor(public language: string) {}
  }

  export class Filter {
    static readonly type = '[PortalPage] Filter';
    constructor(public searchData: SearchRequest, public filter: any, public locale: string) {}
  }

  export class UpdateFilter {
    static readonly type = '[PortalPage] Update Filter';
    constructor(public filter: any) {}
  }

  export class SortItems {
    static readonly type = '[PortalPage] Sort items';
    constructor(public searchData: SearchRequest, public sort: string, public locale: string) {}
  }
}
