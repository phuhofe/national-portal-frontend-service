import { Theme } from './theme.interface';

export interface CustomerSiteServiceSettingsCompany {
  id: number;
  name: string;
}

export interface CustomerSiteServiceSettingsPortalSettings {
  homePage: string;
  loginUrl: string;
  language: string;
  defaultSearchLocation: string;
  availableSearchLocations: string[];
  searchLayout: string;
  initialSearch: boolean;
  searchConfig?: SearchConfig;
}

export interface CustomerSiteServiceSettingsResponse {
  company: CustomerSiteServiceSettingsCompany;
  themes: Theme[];
  portalSettings: CustomerSiteServiceSettingsPortalSettings;
}

export interface CustomerSiteServiceAnalyticsResponse {
  gaTrackingId?: string;
  gtmTrackingId?: string;
}

export interface SearchConfig {
  portal: {
    initialSearch?: boolean;
    emptySearch?: boolean;
    defaultPageSize?: number;
  };
  embedded: {
    initialSearch?: boolean;
    emptySearch?: boolean;
    defaultPageSize?: number;
  };
}
