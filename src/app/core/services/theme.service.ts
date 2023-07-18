import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ColorTypes, ThemeColorTypes } from 'src/app/app.config';
import { SettingsActions } from 'src/app/settings/store/settings.actions';
import { CustomerSiteServiceSettingsResponse } from '../interface/customer-service.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(private store: Store) {}

  apply(companySlug: string, customerSiteSettings: CustomerSiteServiceSettingsResponse): void {
    this.applyTheme(companySlug);
    this.applyColors(customerSiteSettings.themes[0]);
    this.applyMedia(customerSiteSettings.themes[0]);
    this.applyLinks(customerSiteSettings.portalSettings);
    this.applyLanguage(customerSiteSettings.portalSettings);
  }

  applyTheme(companySlug: string): void {
    this.store.dispatch(new SettingsActions.SetSiteThemeSetting({ value: companySlug }));
  }

  applyColors(theme): void {
    const themeColors = theme.colors;

    themeColors
      .filter((themeColor) => themeColor.type === ThemeColorTypes.PRIMARY)
      .forEach((themeColor) => {
        for (const key in themeColor.palette) {
          if (Object.prototype.hasOwnProperty.call(themeColor.palette, key)) {
            const value = themeColor.palette[key];
            document.documentElement.style.setProperty(ColorTypes.PRIMARY + key, value);
          }
        }
      });
  }

  applyMedia(theme): void {
    this.store.dispatch(
      new SettingsActions.SetSiteThemeMediaSetting({
        logo: theme.logo,
        banner: theme.banner,
      })
    );
  }

  applyLinks(portalSettings): void {
    this.store.dispatch(
      new SettingsActions.SetSiteLinksSettings({
        homePage: portalSettings.homePage,
        loginUrl: portalSettings.loginUrl,
      })
    );
  }

  applyLanguage(portalSettings): void {
    this.store.dispatch(new SettingsActions.SetSiteLanguageSettings(portalSettings.language));
  }
}
