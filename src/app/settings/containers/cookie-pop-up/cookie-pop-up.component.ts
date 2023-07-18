import { CookieCategory } from '@adstate_as/flora/lib/interfaces/cookie-pop-up';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from '@app/core/services/cookie.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ApplicationSelectors } from 'src/app/store/application.selectors';
import { ApplicationStateModel } from 'src/app/store/application.state';
import { TrackingService } from '../../services/tracking.service';
import { SettingsActions } from '../../store/settings.actions';
import { SettingsSelectors } from '../../store/settings.selectors';
import { SiteSettingsInterface } from '../../store/settings.state';
import { cookies as defaultCookiesJavaHut } from '../../content/cookies-java-hut';
import { cookies as defaultCookiesNova } from '../../content/cookies-nova';
import { environment } from '@app/env';
import { EnvironmentCookiesConfiguration } from 'src/environments/environment.interface';

@Component({
  selector: 'app-cookie-pop-up',
  templateUrl: './cookie-pop-up.component.html',
  styleUrls: ['./cookie-pop-up.component.scss'],
})
export class CookiePopUpComponent implements OnInit {
  @Select(SettingsSelectors.cookies) cookies$: Observable<CookieCategory[]>;
  @Select(SettingsSelectors.companySlug) companySlug$: Observable<any>;
  @Select(SettingsSelectors.siteLanguageSettings) siteLanguageSetting$: Observable<SiteSettingsInterface['siteLanguage']>;
  @Select(ApplicationSelectors.currentReadyLanguage) currentReadyLanguage$: Observable<ApplicationStateModel['currentReadyLanguage']>;

  @Output() seeDetails = new EventEmitter();
  @Output() eventListenerStarted = new EventEmitter();

  cookies: CookieCategory[];
  eventListenerHasStarted = false;

  readonly ACCEPT_ALL = 'accept_all';
  readonly SEE_DETAILS = 'see_details';
  readonly ONLY_NECESSARY = 'only_necessary';

  constructor(private store: Store, private cookieService: CookieService, private trackingService: TrackingService) {}

  ngOnInit(): void {
    this.startEventListeners();
    this.setupLanguageSwitching();
  }

  setupLanguageSwitching(): void {
    this.currentReadyLanguage$.subscribe((currentReadyLanguage) => {
      if (currentReadyLanguage) {
        this.store.dispatch(new SettingsActions.UpdateCookiesTranslations(currentReadyLanguage));
        this.store.dispatch(new SettingsActions.UpdateAvailableLanguages(currentReadyLanguage));
      }
    });
  }

  cookiePopUpSubmit(event): void {
    this.store.dispatch(new SettingsActions.SetCookiePopUp(false));

    if (event.buttonClicked === this.SEE_DETAILS) {
      this.seeDetails.emit();
    }

    let cookieCategories = event.cookieCategories;

    const defaultCookies =
      environment.cookies.configuration === EnvironmentCookiesConfiguration.nova ? defaultCookiesNova : defaultCookiesJavaHut;

    if (event.buttonClicked === this.ONLY_NECESSARY) {
      cookieCategories = defaultCookies;
      for (const categorySlug of cookieCategories) {
        this.store.dispatch(new SettingsActions.UpdateCookieCategory({ category: categorySlug.slug, newValue: categorySlug }));
      }
    }

    // set all to accepted
    if (event.buttonClicked === this.ACCEPT_ALL) {
      for (const category in event.cookieCategories) {
        if (Object.prototype.hasOwnProperty.call(event.cookieCategories, category)) {
          event.cookieCategories[category] = {
            indeterminate: false,
            checked: true,
          };
        }
      }
      this.updateCookies(cookieCategories);
    }

    if ([this.ACCEPT_ALL, this.ONLY_NECESSARY].includes(event.buttonClicked)) {
      this.store.dispatch(new SettingsActions.SaveCookiePopUp());
      this.store.dispatch(new SettingsActions.SaveCookiesState());
    }
  }

  updateCookies(cookieCategoriesStatuses): void {
    for (const categorySlug in cookieCategoriesStatuses) {
      if (Object.prototype.hasOwnProperty.call(cookieCategoriesStatuses, categorySlug)) {
        const cookieCategoryStatus = cookieCategoriesStatuses[categorySlug];
        this.store.dispatch(new SettingsActions.UpdateCookieCategory({ category: categorySlug, newValue: cookieCategoryStatus }));
      }
    }
  }

  openCookiePopUp(): void {
    this.store.dispatch(new SettingsActions.SetCookiePopUp(true));
  }

  closeCookiePopUp(): void {
    this.store.dispatch(new SettingsActions.SetCookiePopUp(false));
  }

  deleteAllCookies(): void {
    this.cookieService.deleteAll();
  }

  startEventListeners(): void {
    if (!this.eventListenerHasStarted) {
      document.addEventListener('adstate-settings-cookie-pop-up-open', () => {
        this.openCookiePopUp();
      });

      document.addEventListener('adstate-settings-cookie-pop-up-close', () => {
        this.closeCookiePopUp();
      });

      document.addEventListener('adstate-settings-cookie-pop-up-delete', () => {
        this.deleteAllCookies();
      });

      this.eventListenerHasStarted = true;
      this.eventListenerStarted.emit();
    }
  }

  onSeeDetail(): void {
    this.trackingService.onTrackCookiePopupSeeDetail();
  }

  onAcceptOnlyNecessary(): void {
    this.trackingService.onTrackCookiePopupAcceptOnlyNecessary();
  }

  onAcceptAll(): void {
    this.trackingService.onTrackCookiePopupAcceptAll();
  }
}
