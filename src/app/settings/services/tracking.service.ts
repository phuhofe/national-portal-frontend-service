import { Injectable } from '@angular/core';
import { TrackingEnum } from '@app/config';

@Injectable({
  providedIn: 'root',
})
export class TrackingService {
  onTrackCookiePopupSeeDetail(): void {
    if (this.isPAQSet()) {
      window._paq.push([TrackingEnum.TrackingEventNameCustom, TrackingEnum.CookiePopup, TrackingEnum.Click, TrackingEnum.SeeDetail]);
    }
  }

  onTrackCookiePopupAcceptOnlyNecessary(): void {
    if (this.isPAQSet()) {
      window._paq.push([
        TrackingEnum.TrackingEventNameCustom,
        TrackingEnum.CookiePopup,
        TrackingEnum.Click,
        TrackingEnum.AcceptOnlyNecessary,
      ]);
    }
  }

  onTrackCookiePopupAcceptAll(): void {
    if (this.isPAQSet()) {
      window._paq.push([TrackingEnum.TrackingEventNameCustom, TrackingEnum.CookiePopup, TrackingEnum.Click, TrackingEnum.AcceptAll]);
    }
  }

  onTrackSettingModalAcceptSelected(): void {
    if (this.isPAQSet()) {
      window._paq.push([TrackingEnum.TrackingEventNameCustom, TrackingEnum.SettingModal, TrackingEnum.Click, TrackingEnum.AcceptSelected]);
    }
  }

  onTrackSettingModalAcceptAll(): void {
    if (this.isPAQSet()) {
      window._paq.push([TrackingEnum.TrackingEventNameCustom, TrackingEnum.SettingModal, TrackingEnum.Click, TrackingEnum.AcceptAll]);
    }
  }

  onTrackDownloadAppPageRedirectForAndroid(): void {
    if (this.isPAQSet()) {
      window._paq.push([TrackingEnum.TrackingEventNameCustom, TrackingEnum.SettingModal, TrackingEnum.Click, TrackingEnum.Android]);
    }
  }

  onTrackDownloadAppPageRedirectForIOS(): void {
    if (this.isPAQSet()) {
      window._paq.push([TrackingEnum.TrackingEventNameCustom, TrackingEnum.DownloadAppPage, TrackingEnum.Redirect, TrackingEnum.IOS]);
    }
  }

  onTrackSiteSearch(searchKeyword: string): void {
    if (this.isPAQSet()) {
      window._paq.push([TrackingEnum.TrackingEventNameSiteSearch, searchKeyword, false, false]);
    }
  }

  isPAQSet(): any {
    return window._paq;
  }
}
