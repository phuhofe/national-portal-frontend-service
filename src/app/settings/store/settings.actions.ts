import { LanguageObject } from '@adstate_as/flora/lib/interfaces/language-switcher.interface';
import { CustomerSiteServiceSettingsCompany } from '@app/core/interface/customer-service.interface';
import { EmbeddedPortalAttributes } from '../interface/embedded-portal-attributes.interface';

export namespace SettingsActions {
  export class GetCookiePopUp {
    static readonly type = '[Settings] Get cookie pop-up';
    constructor() {}
  }

  export class SetCookiePopUp {
    static readonly type = '[Settings] Set cookie pop-up';
    constructor(public show: boolean) {}
  }

  export class SaveCookiePopUp {
    static readonly type = '[Settings] Save cookie pop-up';
    constructor() {}
  }

  export class SetSettingsModal {
    static readonly type = '[Settings] Set settings modal';
    constructor(public show: boolean) {}
  }

  export class GetSavedCookies {
    static readonly type = '[Settings] Get cookies';
    constructor(public locale: string) {}
  }

  export class UpdateCookieCategory {
    static readonly type = '[Settings] Update cookie category';
    constructor(
      public options: {
        category: string;
        newValue: {
          checked: boolean;
          indeterminate: boolean;
        };
      }
    ) {}
  }

  export class UpdateCookie {
    static readonly type = '[Settings] Update Cookie';
    constructor(
      public options: {
        category: string;
        cookie: string;
        newValue: {
          checked: boolean;
          indeterminate: boolean;
        };
      }
    ) {}
  }

  export class SaveCookiesState {
    static readonly type = '[Settings] Save Cookies State';
    constructor() {}
  }

  export class GetDefaultSiteSettings {
    static readonly type = '[Settings] Get Site Settings State';
    constructor(public companyName?: string) {}
  }

  export class SetSlugSetting {
    static readonly type = '[Settings] Set Slug Site Setting';
    constructor(public value: any) {}
  }

  export class SetSiteThemeSetting {
    static readonly type = '[Settings] Set Theme setting';
    constructor(public value: any) {}
  }

  export class SetSiteThemeMediaSetting {
    static readonly type = '[Settings] Set Theme Media setting';
    constructor(public value: any) {}
  }
  export class SetPortalSettings {
    static readonly type = '[Settings] Set Portal settings';
    constructor(public value: any) {}
  }

  export class SetSiteLinksSettings {
    static readonly type = '[Settings] Set Site Links Settings';
    constructor(public value: any) {}
  }

  export class SetSiteLanguageSettings {
    static readonly type = '[Settings] Set Site Language Settings';
    constructor(public value: LanguageObject['iso']) {}
  }
  export class SaveSiteSettingsState {
    static readonly type = '[Settings] Save Site Settings State';
    constructor() {}
  }

  export class ResetSiteSettingsState {
    static readonly type = '[Settings] Reset site settings state';
    constructor() {}
  }

  export class SetCompany {
    static readonly type = '[Settings] Set company state';
    constructor(public company: CustomerSiteServiceSettingsCompany) {}
  }

  export class AcceptAllCookies {
    static readonly type = '[Settings] Accept all cookies from init state';
    constructor() {}
  }

  export class SetupInitialEmbeddedPortalAttributes {
    static readonly type = '[Settings] Set up initial attributes for the embedded portal';
    constructor(public embeddedPortalAttributes: EmbeddedPortalAttributes) {}
  }

  export class GetPortalSettingByCompany {
    static readonly type = '[Settings] Get portal settings by company';
    constructor(public companyName: string) {}
  }

  export class ApplyTheme {
    static readonly type = '[Settings] Apply theme by company';
    constructor(public companyName: string, public data: any) {}
  }

  export class UpdateCookiesTranslations {
    static readonly type = '[Settings] Update Cookies';
    constructor(public language: string) {}
  }

  export class UpdateAvailableLanguages {
    static readonly type = '[Settings] Update Available Languages';
    constructor(public language: string) {}
  }
}
