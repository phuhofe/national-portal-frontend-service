import { Selector } from '@ngxs/store';
import { CookieCategory } from '@adstate_as/flora/lib/interfaces/cookie-pop-up';

import { CustomerSiteServiceSettingsCompany, SearchConfig } from '@app/core/interface/customer-service.interface';
import { SettingsState, SettingsStateModel, SiteSettingsInterface } from './settings.state';
import { NationalPortalCompanyName } from '@app/config';
import { EmbeddedPortalAttributes } from '../interface/embedded-portal-attributes.interface';
import { environment } from '@app/env';
import { Footer } from '@app/core/interface/footer.interface';

export class SettingsSelectors extends SettingsState {
  @Selector()
  static cookiePopUp(state: SettingsStateModel): boolean {
    return state.cookiePopUp;
  }

  @Selector()
  static settingsModal(state: SettingsStateModel): boolean {
    return state.settingsModal;
  }

  @Selector()
  static cookies(state: SettingsStateModel): CookieCategory[] {
    return state.cookies;
  }

  @Selector()
  static cookiesWithScripts(state: SettingsStateModel): any[] {
    const cookiesWithScripts = [];

    state.cookies
      .filter((cookieCategory) => !!cookieCategory.cookies)
      .forEach((cookieCategory) => {
        cookieCategory.cookies
          .filter((cookie) => !!cookie.script && cookie.scriptCanLoad)
          .forEach((cookie) => {
            cookiesWithScripts.push(cookie);
          });
      });

    return cookiesWithScripts;
  }

  @Selector()
  static siteSettings(state: SettingsStateModel): SiteSettingsInterface {
    return state.siteSettings;
  }

  @Selector()
  static company(state: SettingsStateModel): CustomerSiteServiceSettingsCompany {
    return state.company;
  }

  @Selector()
  static companies(state: SettingsStateModel): any {
    return state.companies;
  }

  @Selector()
  static embeddedPortalAttributes(state: SettingsStateModel): EmbeddedPortalAttributes {
    return state.embeddedPortalAttributes;
  }

  @Selector()
  static displayBannerAttributes(state: SettingsStateModel): any {
    return state.embeddedPortalAttributes.displayBanner;
  }

  @Selector()
  static themeSettings(state: SettingsStateModel): any {
    return state.siteSettings.theme;
  }

  @Selector()
  static slugSettings(state: SettingsStateModel): any {
    return state.siteSettings.slug;
  }

  @Selector()
  static companySlug(state: SettingsStateModel): string {
    if (!state.siteSettings.slug.value) {
      return NationalPortalCompanyName;
    }

    return state.siteSettings.slug.value;
  }

  @Selector()
  static themeMediaSettings(state: SettingsStateModel): any {
    return state.siteSettings.themeMedia;
  }

  @Selector()
  static portalSiteSettings(state: SettingsStateModel): any {
    return state.siteSettings.portalSettings;
  }

  @Selector()
  static siteLinkSettings(state: SettingsStateModel): any {
    return state.siteSettings.siteLinks;
  }

  @Selector()
  static siteLanguageSettings(state: SettingsStateModel): SiteSettingsInterface['siteLanguage'] {
    return state.siteSettings.siteLanguage;
  }

  @Selector([SettingsSelectors.portalSiteSettings])
  static companySearchLayout(state: any, portalSettings: any): string {
    return portalSettings.value.searchLayout;
  }

  @Selector([SettingsSelectors.portalSiteSettings])
  static companyDomain(state: any, portalSettings: any): string {
    return new URL(portalSettings.value.loginUrl).hostname;
  }

  @Selector([SettingsSelectors.portalSiteSettings])
  static availableSearchLocations(state: any, portalSettings: any): string[] {
    return portalSettings.value.availableSearchLocations;
  }

  @Selector([SettingsSelectors.portalSiteSettings])
  static defaultSearchLocation(state: any, portalSettings: any): string {
    return portalSettings.value.defaultSearchLocation;
  }

  @Selector([SettingsSelectors.searchConfig])
  static initialSearch(state: SettingsStateModel, searchConfig: SearchConfig): boolean {
    if (environment.exportPortalComponent) {
      return searchConfig.embedded.initialSearch;
    }
    return searchConfig.portal.initialSearch;
  }

  @Selector()
  static isGettingCompany(state: SettingsStateModel): any {
    return state.isGettingCompany;
  }

  @Selector()
  static availableLanguages(state: SettingsStateModel): any {
    return state.availableLanguages;
  }

  @Selector()
  static searchConfig(state: SettingsStateModel): SearchConfig {
    return state.siteSettings.portalSettings.value.searchConfig;
  }

  @Selector([SettingsSelectors.searchConfig])
  static emptySearchOn(state: SettingsStateModel, searchConfig: any): boolean {
    if (environment.exportPortalComponent) {
      return searchConfig.embedded?.emptySearch;
    }

    return searchConfig.portal?.emptySearch;
  }

  @Selector([SettingsSelectors.searchConfig])
  static defaultPageSize(state: SettingsStateModel, searchConfig: any): number {
    if (environment.exportPortalComponent) {
      return searchConfig.embedded?.defaultPageSize;
    }

    return searchConfig.portal?.defaultPageSize;
  }

  @Selector([SettingsSelectors.portalSiteSettings])
  static portalSettingsFooter(state: SettingsStateModel, portalSettings: any): Footer {
    if (environment.exportPortalComponent) {
      return portalSettings.value.footer.embedded;
    }

    return portalSettings.value.footer.hosted;
  }
}
