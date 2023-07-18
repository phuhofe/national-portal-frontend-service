import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { CookieService } from '@app/core/services/cookie.service';
import { CustomerSiteService } from '@app/core/services/customer-site.service';
import { CookieCategory } from '@adstate_as/flora/lib/interfaces/cookie-pop-up';
import { ImageAlignment, SnippetAttribute, TagName } from 'src/app/app.config';
import { SettingsActions } from '../store/settings.actions';
import { cookies as defaultCookiesJavaHut } from '../content/cookies-java-hut';
import { cookies as defaultCookiesNova } from '../content/cookies-nova';
import { siteSettings as defaultSiteSettings } from '../content/site-settings';
import { CustomerSiteServiceSettingsCompany, SearchConfig } from '@app/core/interface/customer-service.interface';
import { EmbeddedPortalAttributes } from '../interface/embedded-portal-attributes.interface';
import { ThemeService } from '@app/core/services/theme.service';
import { environment } from '@app/env';
import { EnvironmentCookiesConfiguration } from 'src/environments/environment.interface';
import { LanguageObject } from '@adstate_as/flora/lib/interfaces/language-switcher.interface';
import { TranslocoService } from '@ngneat/transloco';
import { SeoService } from '@app/core/services/seo.service';

export interface SiteSettingsInterface {
  theme: {
    value: string;
  };
  slug: {
    value: string;
  };
  themeMedia: {
    value: {
      logo: { imageUrl: string; align: ImageAlignment; display: boolean };
      banner: { imageUrl: string; align: ImageAlignment; display: boolean };
    };
  };
  portalSettings: {
    value: {
      homePage: string;
      language: string;
      defaultSearchLocation: string;
      availableSearchLocations: string[];
      searchLayout: string;
      initialSearch: boolean;
      loginUrl: string;
      searchConfig?: SearchConfig;
    };
  };
  siteLinks: {
    value: { homePage: string; loginUrl: string };
  };
  siteLanguage: {
    value: LanguageObject['iso'];
  };
}

export interface SettingsStateModel {
  cookies: CookieCategory[];
  siteSettings: typeof defaultSiteSettings;
  cookiePopUp: boolean; // Show (true) / hide (false) cookie pop-up
  settingsModal: boolean;
  company: CustomerSiteServiceSettingsCompany;
  embeddedPortalAttributes: EmbeddedPortalAttributes;
  companies: Array<CustomerSiteServiceSettingsCompany>;
  portalSettings: any;
  isGettingCompany: boolean;
  availableLanguages: any;
}

let defaultCookies = defaultCookiesJavaHut;
if (environment.cookies.configuration === EnvironmentCookiesConfiguration.nova) {
  defaultCookies = defaultCookiesNova;
}

@State({
  name: 'settings',
  defaults: {
    cookies: defaultCookies,
    cookiePopUp: true,
    siteSettings: defaultSiteSettings,
    settingsModal: false,
    company: undefined,
    embeddedPortalAttributes: [],
    companies: [],
    portalSettings: {},
    isGettingCompany: false,
    availableLanguages: [],
  },
})
@Injectable()
export class SettingsState {
  private cookiePopUpCookieName = 'cookie-pop-up';
  private cookieSettingsCookieName = 'cookie-settings';
  private siteSettingsCookieName = 'site-settings';

  constructor(
    private cookieService: CookieService,
    private customerSiteService: CustomerSiteService,
    private themeService: ThemeService,
    private translationService: TranslocoService,
    private seoService: SeoService,
    private store: Store
  ) {}

  // Get 'cookie pop-up' value into state from saved cookie
  @Action(SettingsActions.GetCookiePopUp)
  getCookiePopUp(ctx: StateContext<SettingsStateModel>): void {
    ctx.patchState({
      cookiePopUp: this.cookieService.get(this.cookiePopUpCookieName, true),
    });
  }

  // Set 'cookie pop-up' value in state
  @Action(SettingsActions.SetCookiePopUp)
  setCookiePopUp(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetCookiePopUp): void {
    ctx.patchState({
      cookiePopUp: action.show,
    });
  }

  // Save 'cookie pop-up' value in cookie
  @Action(SettingsActions.SaveCookiePopUp)
  saveCookiePopUp(ctx: StateContext<SettingsStateModel>): void {
    this.cookieService.set(this.cookiePopUpCookieName, ctx.getState().cookiePopUp);
  }

  // Set 'cookie pop-up' value in state
  @Action(SettingsActions.SetSettingsModal)
  setSettingsModal(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetSettingsModal): void {
    ctx.patchState({
      settingsModal: action.show,
    });
  }

  // Get cookie settings state from a JSON string saved in a cookie
  @Action(SettingsActions.GetSavedCookies)
  getSavedCookies(ctx: StateContext<SettingsStateModel>, action: SettingsActions.GetSavedCookies): void {
    this.store.dispatch(new SettingsActions.UpdateCookiesTranslations(action.locale));
    this.store.dispatch(new SettingsActions.UpdateAvailableLanguages(action.locale));
    const cookiesState = this.cookieService.get(this.cookieSettingsCookieName, defaultCookies);

    ctx.patchState({
      cookies: [...cookiesState],
    });
  }

  // Update a cookie category
  // children will update it's checked/unchecked status
  @Action(SettingsActions.UpdateCookieCategory)
  updateCookieCategory(ctx: StateContext<SettingsStateModel>, action: SettingsActions.UpdateCookieCategory): void {
    const state = JSON.parse(JSON.stringify(ctx.getState()));

    state.cookies
      .filter((cookieCategory) => cookieCategory.slug === action.options.category)
      .forEach((cookieCategory) => {
        cookieCategory.checked = action.options.newValue.checked;
        cookieCategory.indeterminate = action.options.newValue.indeterminate;

        if (cookieCategory.cookies && !cookieCategory.indeterminate) {
          cookieCategory.cookies.forEach((cookie) => (cookie.checked = cookieCategory.checked));
        }
      });

    ctx.setState({
      ...state,
      cookies: [...state.cookies],
    });
  }

  // Update a single cookie
  // Parent will update it's checked/unchecked/indeterminate status
  @Action(SettingsActions.UpdateCookie)
  updateCookie(ctx: StateContext<SettingsStateModel>, action: SettingsActions.UpdateCookie): void {
    const state = JSON.parse(JSON.stringify(ctx.getState()));

    state.cookies
      .filter((cookieCategory) => cookieCategory.slug === action.options.category)
      .forEach((cookieCategory) => {
        cookieCategory.cookies
          .filter((cookie) => cookie.slug === action.options.cookie)
          .forEach((cookie) => (cookie.checked = action.options.newValue.checked));

        let allCookiesChecked = true;
        let atLeastOnCookieChecked = false;
        cookieCategory.cookies.forEach((cookie) => {
          if (allCookiesChecked && !cookie.checked) {
            allCookiesChecked = false;
          }

          if (!atLeastOnCookieChecked && cookie.checked) {
            atLeastOnCookieChecked = true;
          }
        });

        if (allCookiesChecked && (!cookieCategory.checked || cookieCategory.indeterminate)) {
          cookieCategory.checked = true;
          cookieCategory.indeterminate = false;
        } else if (!allCookiesChecked && atLeastOnCookieChecked) {
          cookieCategory.checked = false;
          cookieCategory.indeterminate = true;
        } else {
          cookieCategory.checked = false;
          cookieCategory.indeterminate = false;
        }
      });

    ctx.setState({
      ...state,
      cookies: [...state.cookies],
    });
  }

  // Save cookie settings state in a JSON string in a cookie
  @Action(SettingsActions.SaveCookiesState)
  saveCookiesState(ctx: StateContext<SettingsStateModel>): void {
    const state = JSON.parse(JSON.stringify(ctx.getState()));

    state.cookies.forEach((cookieCategory) => {
      cookieCategory.cookies.filter((cookie) => !!cookie.script).forEach((cookie) => (cookie.scriptCanLoad = cookie.checked));
    });

    ctx.setState({
      ...state,
      cookies: [...state.cookies],
    });

    this.cookieService.set(this.cookieSettingsCookieName, state.cookies);
  }

  // Get site settings from a JSON string saved in a cookie
  @Action(SettingsActions.GetDefaultSiteSettings)
  getDefaultSiteSettings(ctx: StateContext<SettingsStateModel>): void {
    const siteSettingsState = this.cookieService.get(this.siteSettingsCookieName, defaultSiteSettings);

    ctx.patchState({
      siteSettings: defaultSiteSettings,
    });
  }

  @Action(SettingsActions.SetSiteThemeSetting)
  setSiteThemeSetting(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetSiteThemeSetting): void {
    ctx.setState({
      ...ctx.getState(),
      siteSettings: {
        ...ctx.getState().siteSettings,
        theme: {
          ...ctx.getState().siteSettings.theme,
          value: { ...action.value },
        },
      },
    });
  }

  @Action(SettingsActions.SetSlugSetting)
  setSlugSetting(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetSlugSetting): void {
    ctx.setState({
      ...ctx.getState(),
      siteSettings: {
        ...ctx.getState().siteSettings,
        slug: {
          ...ctx.getState().siteSettings.slug,
          value: action.value.toLowerCase(),
        },
      },
    });
  }

  @Action(SettingsActions.SetSiteThemeMediaSetting)
  setSiteThemeMediaSetting(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetSiteThemeMediaSetting): void {
    const currentState = ctx.getState();

    ctx.setState({
      ...currentState,
      siteSettings: {
        ...currentState.siteSettings,
        themeMedia: {
          ...currentState.siteSettings.themeMedia,
          value: { ...action.value },
        },
      },
    });
  }

  @Action(SettingsActions.SetPortalSettings)
  setPortalSettings(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetPortalSettings): void {
    const currentState = ctx.getState();

    ctx.setState({
      ...currentState,
      siteSettings: {
        ...currentState.siteSettings,
        portalSettings: {
          ...currentState.siteSettings.portalSettings,
          value: { ...action.value },
        },
      },
    });
  }

  @Action(SettingsActions.SetSiteLinksSettings)
  setSiteLinksSettings(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetSiteLinksSettings): void {
    ctx.setState({
      ...ctx.getState(),

      siteSettings: {
        ...ctx.getState().siteSettings,
        siteLinks: {
          ...ctx.getState().siteSettings.siteLinks,
          value: { ...action.value },
        },
      },
    });
  }

  @Action(SettingsActions.SetSiteLanguageSettings)
  setSiteLanguageSettings(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetSiteLanguageSettings): void {
    ctx.setState({
      ...ctx.getState(),
      siteSettings: {
        ...ctx.getState().siteSettings,
        siteLanguage: {
          ...ctx.getState().siteSettings.siteLanguage,
          value: action.value,
        },
      },
    });

    this.translationService.setActiveLang(action.value);
    this.seoService.setHtmlLang(action.value);
    this.store.dispatch(new SettingsActions.SaveSiteSettingsState());
  }

  // Save cookie settings state in a JSON string in a cookie
  @Action(SettingsActions.SaveSiteSettingsState)
  saveSiteSettingsState(ctx: StateContext<SettingsStateModel>): void {
    const state = ctx.getState();
    this.cookieService.set(this.siteSettingsCookieName, state.siteSettings);
  }

  // Save cookie settings state in a JSON string in a cookie
  @Action(SettingsActions.ResetSiteSettingsState)
  resetSiteSettingsState(ctx: StateContext<SettingsStateModel>): void {
    this.cookieService.delete(this.siteSettingsCookieName);

    ctx.patchState({
      siteSettings: {
        ...defaultSiteSettings,
      },
    });
  }

  // Set a single site setting
  @Action(SettingsActions.SetCompany)
  setCompany(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetCompany): void {
    ctx.patchState({
      company: action.company,
    });
  }

  @Action(SettingsActions.AcceptAllCookies)
  acceptAllCookies(ctx: StateContext<SettingsStateModel>): void {
    const allCookie = defaultCookies.map((cookie) => {
      return {
        ...cookie,
        checked: true,
      };
    });

    ctx.patchState({
      cookiePopUp: false,
      cookies: [...allCookie],
    });

    this.store.dispatch(new SettingsActions.SaveCookiePopUp());
    this.store.dispatch(new SettingsActions.SaveCookiesState());
  }

  @Action(SettingsActions.SetupInitialEmbeddedPortalAttributes)
  setUpInitialAttributes(ctx: StateContext<SettingsStateModel>, action: SettingsActions.SetupInitialEmbeddedPortalAttributes): void {
    ctx.patchState({
      embeddedPortalAttributes: action.embeddedPortalAttributes,
    });
  }

  @Action(SettingsActions.GetPortalSettingByCompany)
  getPortalSettingByCompany(ctx: StateContext<SettingsStateModel>, action: SettingsActions.GetPortalSettingByCompany): void {
    const companyName = action.companyName;
    const currentState = ctx.getState();

    if (!currentState.isGettingCompany) {
      ctx.patchState({ isGettingCompany: true });

      this.customerSiteService.getSettings(companyName).subscribe((data: any) => {
        let element = document.querySelector(TagName.AppRoot) ?? document.querySelector(TagName.AdstatePortal);
        if (!element) {
          element = document.querySelector(TagName.SettingsComponent);
        }
        const language = element.getAttribute(SnippetAttribute.Language);

        const portalSettings = {
          ...data.portalSettings,
          language: language ?? data.portalSettings.language,
        };

        ctx.patchState({
          company: data.company,
          isGettingCompany: false,
          siteSettings: {
            ...currentState.siteSettings,
            slug: {
              ...currentState.siteSettings.slug,
              value: companyName,
            },
            siteLinks: {
              ...currentState.siteSettings.siteLinks,
              value: {
                homePage: data.portalSettings.homePage,
                loginUrl: data.portalSettings.loginUrl,
              },
            },
            siteLanguage: {
              ...currentState.siteSettings.siteLanguage,
              value: language ?? data.portalSettings.language,
            },
            themeMedia: {
              ...currentState.siteSettings.themeMedia,
              value: {
                logo: data.themes[0].logo,
                banner: data.themes[0].banner,
              },
            },
            portalSettings: {
              ...currentState.siteSettings.portalSettings,
              value: portalSettings,
            },
          },
        });
        const settingData = {
          ...data,
          portalSettings,
        };
        this.store.dispatch(new SettingsActions.ApplyTheme(companyName, settingData));
      });
    }
  }

  @Action(SettingsActions.ApplyTheme)
  applyTheme(ctx: StateContext<SettingsStateModel>, action: SettingsActions.ApplyTheme): void {
    this.themeService.apply(action.companyName, action.data);
  }

  @Action(SettingsActions.UpdateCookiesTranslations)
  updateCookiesTranslations(ctx: StateContext<SettingsStateModel>, action: SettingsActions.UpdateCookiesTranslations): void {
    const { cookies } = ctx.getState();

    ctx.patchState({
      cookies: cookies.map((cookie) => {
        const cookiesData = cookie.cookies.map((item) => {
          return {
            ...item,
            title: this.translationService.translate(item.titleOriginal ? item.titleOriginal : item.title, {}, action.language),
            titleOriginal: item.titleOriginal ? item.titleOriginal : item.title,
            type: this.translationService.translate(item.typeOriginal ? item.typeOriginal : item.type, {}, action.language),
            typeOriginal: item.typeOriginal ? item.typeOriginal : item.type,
            expiry: this.translationService.translate(item.expiryOriginal ? item.expiryOriginal : item.expiry, {}, action.language),
            expiryOriginal: item.expiryOriginal ? item.expiryOriginal : item.expiry,
            description: this.translationService
              .translate(item.descriptionOriginal ? item.descriptionOriginal : item.description, {}, action.language)
              .split('\\n')
              .join('\n'),
            descriptionOriginal: item.descriptionOriginal ? item.descriptionOriginal : item.description,
          };
        });
        return {
          ...cookie,
          title: this.translationService.translate(cookie.titleOriginal ? cookie.titleOriginal : cookie.title, {}, action.language),
          titleOriginal: cookie.titleOriginal ? cookie.titleOriginal : cookie.title,
          description: this.translationService.translate(
            cookie.descriptionOriginal ? cookie.descriptionOriginal : cookie.description,
            {},
            action.language
          ),
          descriptionOriginal: cookie.descriptionOriginal ? cookie.descriptionOriginal : cookie.description,
          cookies: cookiesData,
        };
      }),
    });
  }

  @Action(SettingsActions.UpdateAvailableLanguages)
  updateAvailableLanguages(ctx: StateContext<SettingsStateModel>, action: SettingsActions.UpdateAvailableLanguages): void {
    ctx.patchState({
      availableLanguages: [
        {
          name: this.translationService.translate('portalPage.menu.language.english', {}, action.language),
          iso: 'en_GB',
          flag: 'https://img.adstate.com/awdK8dUS6QnLhq7S2ClAKEbjqySIEJMammku7GBannU/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvZmxhZ3MvZW5fR0Iuc3ZnP2poUUdpbnZKOXNNcF9aM05lUGg4YWVoQ05Md0ouN3pY.svg',
        },
        {
          name: this.translationService.translate('portalPage.menu.language.norwegian', {}, action.language),
          iso: 'nb_NO',
          flag: 'https://img.adstate.com/sGaNaR1FJeJdb2gGyGVgpucpcisVlne_lQ2JR5UVjYc/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvZmxhZ3MvbmJfTk8uc3ZnP2NkMUI5WHV0R2Nud1JVMW9yS1Q2YTB2a0Z3WHJpeHJt.svg',
        },
        {
          name: this.translationService.translate('portalPage.menu.language.swedish', {}, action.language),
          iso: 'sv_SE',
          flag: 'https://img.adstate.com/39EV0-jAsuKK2mL5AUSmhkGqUfnGpjuzleOFTluBs7k/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvZmxhZ3Mvc3ZfU0Uuc3ZnP2t4SkExM0tGMHRTSXhpRTBsbzI4NXBEUmwwNERpX1Jt.svg',
        },
        {
          name: this.translationService.translate('portalPage.menu.language.danish', {}, action.language),
          iso: 'da_DK',
          flag: 'https://img.adstate.com/ZoS_cAlbs1HDkIRZ84CbDUPts0ngxMYU5BGNF0NfhUw/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvZmxhZ3MvZGFfREsuc3ZnP1loT3VQUVh3TkxhZkh4b2tycWtrZGhSMVpkOU5ZSTE2.svg',
        },
        {
          name: this.translationService.translate('portalPage.menu.language.dutch', {}, action.language),
          iso: 'nl_NL',
          flag: 'https://img.adstate.com/VC2lZTaMJwiQKuVrc_pkCRBB0ffBCuuSxUUVZaWeuWY/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvZmxhZ3MvbmxfTkwuc3ZnP2VueDJJRW9tV2ZId2dWU0kxRWtSbHFsOC5uc19UVlVU.svg',
        },
      ],
    });
  }
}
