import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { filter } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

import { EnvironmentName } from '@app/core/enums/environment-name.enum';
import { SettingsActions } from 'src/app/settings/store/settings.actions';
import { SettingsSelectors } from 'src/app/settings/store/settings.selectors';
import { LanguageObject } from '@adstate_as/flora/lib/interfaces/language-switcher.interface';
import { environment } from '@app/env';
import { SiteSettingsInterface } from 'src/app/settings/store/settings.state';
import { EmbeddedPortalAttributes } from 'src/app/settings/interface/embedded-portal-attributes.interface';
import { TagName, SnippetAttribute, NationalPortalCompanyName, LanguageOptions, ImageAlignment, TranslationLoadTypes } from '@app/config';

import { ApplicationActions } from 'src/app/store/application.actions';
import { ApplicationSelectors } from 'src/app/store/application.selectors';
import { ApplicationStateModel } from 'src/app/store/application.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Select(SettingsSelectors.companies) companies$: Observable<any>;
  @Select(SettingsSelectors.siteLanguageSettings) siteLanguageSetting$: Observable<SiteSettingsInterface['siteLanguage']>;
  @Select(SettingsSelectors.siteLinkSettings) siteLinkSetting$: Observable<any>;
  @Select(SettingsSelectors.themeMediaSettings) themeMediaSettings$: Observable<any>;
  @Select(SettingsSelectors.companySlug) companySlug$: Observable<any>;
  @Select(SettingsSelectors.embeddedPortalAttributes) embeddedPortalAttributes$: Observable<EmbeddedPortalAttributes>;
  @Select(SettingsSelectors.availableLanguages) availableLanguages$: Observable<any>;

  company = '';
  displayLanguageSwitcher = true;
  useCookiePopUp = true;
  displayNavBar = true;
  displayBanner = true;
  displayMenu = true;
  displayLogo = true;
  logo: {
    imageUrl: string;
    align: string;
    display: boolean;
  };
  links: any = {};
  applicationIsEmbedded = environment.exportPortalComponent;
  hostLink = environment.hostLink;
  NationalPortalCompanyName = NationalPortalCompanyName;
  ImageAlignment = ImageAlignment;
  isDevEnvironment = environment.name === EnvironmentName.DEVELOPMENT || environment.name === EnvironmentName.LOCAL;
  isMobileScreen$: Observable<boolean | BreakpointState>;
  storeButtons = [
    {
      url: '/app',
      srcImg:
        'https://img.adstate.com/3ZLgP8r2QlgQCW884-vu47_39D-Ak69nhfNe5VR-zQw/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS8vYWRtZW1vcmlhLXJlc291cmNlcy9kb3dubG9hZC1iYWRnZXMvZW4tYXBwbGUtYXBwLXN0b3JlLWRvd25sb2FkLWJhZGdlLnN2Zw.svg',
      altImg: 'Apple App Store badge',
    },
    {
      url: '/app',
      srcImg:
        'https://img.adstate.com/x5Y0tgcCEFdnZC5BAtTpGZQzv1E58xnYw46juESgoAU/rs:fit:384:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS8vYWRtZW1vcmlhLXJlc291cmNlcy9kb3dubG9hZC1iYWRnZXMvZW4tZ29vZ2xlLXBsYXktc3RvcmUtZG93bmxvYWQtYmFkZ2UucG5n.png',
      altImg: 'Google Play Store badge',
    },
  ];

  constructor(private store: Store, private translateService: TranslocoService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.setUpInitialAttributes();
    this.setupThemeMedia();
    this.setupSiteLinks();
    this.breakpointObserve();

    if (this.useCookiePopUp === false) {
      this.store.dispatch(new SettingsActions.AcceptAllCookies());
    }
  }

  breakpointObserve(): void {
    this.isMobileScreen$ = this.breakpointObserver.observe(['(max-width: 1023px)']).pipe(filter(() => this.isDevEnvironment));
  }

  setUpInitialAttributes(): void {
    let element = document.querySelector(TagName.AppRoot) ?? document.querySelector(TagName.AdstatePortal);

    if (!element) {
      element = document.querySelector(TagName.SettingsComponent);
    }

    const companyName = element?.getAttribute(SnippetAttribute.Company) ?? NationalPortalCompanyName;
    const language = element?.getAttribute(SnippetAttribute.Language) ?? LanguageOptions.EN_GB;

    if (element?.hasAttribute(SnippetAttribute.Company)) {
      this.store.dispatch(new SettingsActions.GetPortalSettingByCompany(companyName));
      this.store.dispatch(new SettingsActions.SetSlugSetting(companyName));
    }

    if (element?.hasAttribute(SnippetAttribute.Language)) {
      this.store.dispatch(new SettingsActions.SetSiteLanguageSettings(language));
    }

    this.displayLanguageSwitcher = this.setupBoolAttribute(element, SnippetAttribute.DisplayLanguageSwitcher, this.displayLanguageSwitcher);
    this.useCookiePopUp = this.setupBoolAttribute(element, SnippetAttribute.UseCookiePopUp, this.useCookiePopUp);
    this.displayBanner = this.setupBoolAttribute(element, SnippetAttribute.DisplayBanner, this.displayBanner);
    this.displayMenu = this.setupBoolAttribute(element, SnippetAttribute.DisplayMenu, this.displayMenu);
    this.displayLogo = this.setupBoolAttribute(element, SnippetAttribute.DisplayLogo, this.displayLogo);

    // If any of these are true, we want to show the navbar. We only hide when all are false
    this.displayNavBar = !(!this.displayLanguageSwitcher && !this.displayMenu && !this.displayLogo);

    this.store.dispatch(
      new SettingsActions.SetupInitialEmbeddedPortalAttributes({
        displayLanguageSwitcher: this.displayLanguageSwitcher,
        useCookiePopUp: this.useCookiePopUp,
        displayBanner: this.displayBanner,
        displayMenu: this.displayMenu,
        displayLogo: this.displayLogo,
      })
    );
  }

  setupThemeMedia(): void {
    this.themeMediaSettings$.subscribe((themeMedia) => {
      if (themeMedia) {
        return (this.logo = themeMedia.value.logo);
      }
    });
  }

  setupSiteLinks(): void {
    this.siteLinkSetting$.subscribe((linkSettings) => {
      this.links.funeralHomePage = linkSettings.value.homePage;
      this.links.login = linkSettings.value.loginUrl;
    });
  }

  openSettings(): void {
    this.store.dispatch(new SettingsActions.SetSettingsModal(true));
  }

  onLanguageSelected(event: LanguageObject): void {
    this.store.dispatch(new SettingsActions.SetSiteLanguageSettings(event.iso));
  }

  private setupBoolAttribute(element: Element, attribute: string, fallback: boolean): boolean {
    if (element?.hasAttribute(attribute)) {
      return element?.getAttribute(attribute) === 'true';
    }

    return fallback;
  }
}
