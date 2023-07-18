import { CookieCategory } from '@adstate_as/flora/lib/interfaces/cookie-pop-up';
import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingsActions } from '../../store/settings.actions';
import { SettingsSelectors } from '../../store/settings.selectors';
import { LanguageObject } from '@adstate_as/flora/lib/interfaces/language-switcher.interface';
import { SiteSettingsInterface } from '../../store/settings.state';
import { environment } from '@app/env';
import { TranslocoService } from '@ngneat/transloco';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TrackingService } from '../../services/tracking.service';

interface Page {
  title?: string;
  slug?: string;
  icon?: string;
  selected?: boolean;
  settings: any;
}

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  @Select(SettingsSelectors.cookies) cookies$: Observable<CookieCategory[]>;
  @Select(SettingsSelectors.siteSettings) siteSettings$: Observable<any[]>;
  @Select(SettingsSelectors.companySlug) companySlug$: Observable<any[]>;
  @Select(SettingsSelectors.siteLanguageSettings) siteLanguageSettings$: Observable<SiteSettingsInterface['siteLanguage']>;
  @Select(SettingsSelectors.availableLanguages) availableLanguages$: Observable<any[]>;

  @Input() initialPage = 'cookies';

  readonly defaultMatomoOptOutUrl =
    'https://matomo.production.ads1.itpartner.no/index.php?module=CoreAdminHome&action=optOut&fontFamily=Roboto,sans-serif&language=en';

  title = 'Settings';
  pages: Page[] = [{ slug: 'cookies', title: 'Cookies', icon: 'cookie', settings: [] }];
  page: Page = {
    title: null,
    slug: null,
    icon: null,
    settings: [],
  };
  cookiesHaveBeenAccepted = false;
  applicationIsEmbedded = environment.exportPortalComponent;
  settingsComponentIsEmbedded = environment.exportSettingsComponent;
  matomoOptOutUrl: SafeResourceUrl = this.defaultMatomoOptOutUrl;

  constructor(
    private store: Store,
    private translateService: TranslocoService,
    private sanitizer: DomSanitizer,
    private trackingService: TrackingService
  ) {}

  ngOnInit(): void {
    this.prepareInitialPage();
    this.preparePage(this.page);

    if (!this.settingsComponentIsEmbedded) {
      this.setupAutomaticLanguageSwitchForMatomoOptOut();
      this.pages.push({ slug: 'matomo', title: 'Matomo', icon: 'analytics', settings: [] });
    }
  }

  onModalClose(): void {
    this.store.dispatch(new SettingsActions.SetSettingsModal(false));

    if (!this.cookiesHaveBeenAccepted) {
      this.store.dispatch(new SettingsActions.SetCookiePopUp(true));
    }
  }

  onPageChange({ oldPage, currentPage }): void {
    this.page = currentPage;
    this.preparePage(this.page);
  }

  onCookieCategoryChange(event, cookieCategory): void {
    this.store.dispatch(
      new SettingsActions.UpdateCookieCategory({
        category: cookieCategory.slug,
        newValue: {
          checked: event.checked,
          indeterminate: event.indeterminate,
        },
      })
    );
  }

  onCookieChange(event, cookie, cookieCategory): void {
    this.store.dispatch(
      new SettingsActions.UpdateCookie({
        category: cookieCategory.slug,
        cookie: cookie.slug,
        newValue: {
          checked: event.checked,
          indeterminate: false,
        },
      })
    );
  }

  onSiteSettingChange(event: { target: { value: any } }, siteSetting: { slug: any }): void {
    this.store.dispatch(new SettingsActions.SetSlugSetting({ value: event.target.value }));
  }

  onSubmit(event, submitter): void {
    event.preventDefault();
    const buttonClicked = submitter;
    if (!buttonClicked) {
      throw new Error(`Something went wrong, we couldn't handle the settings modal submission`);
    }

    if (this.page.slug === 'cookies') {
      // set all to checked
      if (buttonClicked === 'accept_all') {
        this.page.settings.cookies.forEach((cookieCategory) =>
          this.onCookieCategoryChange({ checked: true, indeterminate: false }, cookieCategory)
        );
      }

      // save selected cookies
      if (['accept_selected', 'accept_all'].includes(buttonClicked)) {
        this.store.dispatch(new SettingsActions.SaveCookiesState());
        this.store.dispatch(new SettingsActions.SaveCookiePopUp());
        this.cookiesHaveBeenAccepted = true;
      } else {
        this.store.dispatch(new SettingsActions.SetCookiePopUp(true));
      }

      this.onModalClose();
    } else if (buttonClicked === 'save') {
      this.onModalClose();
    }
  }

  onLanguageSelected(event: LanguageObject): void {
    this.store.dispatch(new SettingsActions.SetSiteLanguageSettings(event.iso));
  }

  onAcceptSelected(): void {
    this.trackingService.onTrackSettingModalAcceptSelected();
  }

  onAcceptAll(): void {
    this.trackingService.onTrackSettingModalAcceptAll();
  }

  private prepareInitialPage(): void {
    if (this.initialPage) {
      this.pages = this.pages.map((page) => {
        page.selected = false;

        if (page.slug === this.initialPage) {
          page.selected = true;
          this.page = page;
        }

        return page;
      });
    }
  }

  private preparePage(page): void {
    if (page.slug === 'cookies') {
      this.cookies$.subscribe((cookies) => {
        page.settings.cookies = cookies;

        if (!page.accordionStatuses) {
          page.accordionStatuses = [];
          page.settings.cookies.forEach((cookie) => (page.accordionStatuses[cookie.slug] = false));
        }
      });
    }
  }

  private setupAutomaticLanguageSwitchForMatomoOptOut(): void {
    this.translateService.langChanges$.subscribe((lang) => {
      this.matomoOptOutUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.defaultMatomoOptOutUrl.replace('&language=en', `&language=${lang.substring(0, 2)}`)
      );
    });
  }
}
