import { LanguageObject } from '@adstate_as/flora/lib/interfaces/language-switcher.interface';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CookieSettings, LanguageOptions, SnippetAttribute, TagName, TranslationLoadTypes } from '@app/config';
import { CookieService } from '@app/core/services/cookie.service';
import { TranslocoService } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import { SettingsActions } from './store/settings.actions';
import { SettingsSelectors } from './store/settings.selectors';
import { SiteSettingsInterface } from './store/settings.state';
import { environment } from '@app/env';
import { ApplicationSelectors } from '../store/application.selectors';
import { ApplicationStateModel } from '../store/application.state';
import { ApplicationActions } from '../store/application.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'adstate-settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() company = 'minnesider';
  @Input() language: LanguageObject['iso'] = 'en_GB';
  @Output() changeLanguage = new EventEmitter();
  @Output() cookiePopUpEventListenerStarted = new EventEmitter();

  @Select(SettingsSelectors.siteSettings) siteSettings$: Observable<SiteSettingsInterface>;
  @Select(SettingsSelectors.slugSettings) slugSettings$: Observable<any>;
  @Select(SettingsSelectors.cookiePopUp) showCookiePopUp$: Observable<boolean>;
  @Select(SettingsSelectors.settingsModal) showSettingsModal$: Observable<boolean>;
  @Select(SettingsSelectors.siteLanguageSettings) siteLanguageSettings$: Observable<SiteSettingsInterface['siteLanguage']>;
  @Select(ApplicationSelectors.readyLanguages) readyLanguages$: Observable<ApplicationStateModel['readyLanguages']>;
  @Select(ApplicationSelectors.currentReadyLanguage) currentReadyLanguage$: Observable<ApplicationStateModel['currentReadyLanguage']>;

  currentTheme: string;
  showCookiePopUp = true;
  showSettingsModal = false;
  initialSettingsModalPage = 'cookies';
  getSettingsForCompany = !environment.exportSettingsComponent;
  useAppWrapper = environment.exportSettingsComponent;
  LanguageOptions = LanguageOptions;
  TranslationLoadTypes = TranslationLoadTypes;
  SnippetAttribute = SnippetAttribute;
  currentReadyLanguageSubscription: Subscription = null;

  constructor(
    private elementRef: ElementRef,
    private store: Store,
    private cookieService: CookieService,
    private translateService: TranslocoService
  ) {
    this.store.dispatch(new SettingsActions.GetCookiePopUp());
    this.cookieService.changes.subscribe((change) => {
      if (change.key === CookieSettings.COOKIEPOPUP) {
        this.store.dispatch(new SettingsActions.GetCookiePopUp());
      }
    });
    this.slugSettings$.subscribe((slugSettings) => {
      this.company = slugSettings.value ?? this.company;
    });
    this.siteLanguageSettings$.subscribe((siteLanguageSettings) => {
      if (!siteLanguageSettings.value) {
        this.language = LanguageOptions.EN_GB;
      } else {
        this.language = siteLanguageSettings.value;
      }

      this.changeLanguage.emit(this.language);
    });
    if (!this.company) {
      /*
      We only want to get default site settings when the slug is null.
      If it's not null, we must have already set the site settings somewhere.
      For example: via element attributes
      */
      this.store.dispatch(new SettingsActions.GetDefaultSiteSettings());
    }
  }

  ngOnInit(): void {
    this.setupLanguageSwitching();
    this.setupAttributes();
  }

  ngOnDestroy(): void {
    if (this.currentReadyLanguageSubscription) {
      this.currentReadyLanguageSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.language && changes.language.previousValue !== changes.language.currentValue) {
      this.language = changes.language.currentValue;
      this.store.dispatch(new SettingsActions.SetSiteLanguageSettings(this.language));
    }

    if (changes?.company && changes.company.previousValue !== changes.company.currentValue) {
      this.company = changes.company.currentValue;
      if (this.getSettingsForCompany) {
        this.store.dispatch(new SettingsActions.GetPortalSettingByCompany(this.company));
      }
    }
  }

  setupAttributes(): void {
    const languageAttribute = this.elementRef.nativeElement.getAttribute(SnippetAttribute.Language);
    if (languageAttribute) {
      this.language = languageAttribute;
      this.store.dispatch(new SettingsActions.SetSiteLanguageSettings(this.language));
    }

    this.siteSettings$.pipe(filter((siteSetting) => !!siteSetting)).subscribe((siteSetting: SiteSettingsInterface) => {
      if (this.getSettingsForCompany && languageAttribute && siteSetting.siteLanguage.value !== languageAttribute) {
        this.store.dispatch(new SettingsActions.GetPortalSettingByCompany(this.company));
      }
    });
  }

  setupLanguageSwitching(): void {
    this.translateService.events$.subscribe((event) => {
      if (event.type === TranslationLoadTypes.TranslationLoadSuccess) {
        this.store.dispatch(new ApplicationActions.AddReadyLanguage(event.payload.langName));
        this.store.dispatch(new ApplicationActions.SetCurrentReadyLanguage(event.payload.langName));
      }
    });

    this.translateService.langChanges$.subscribe((newLanguage) => {
      this.readyLanguages$.forEach((readyLanguage) => {
        if (readyLanguage && readyLanguage.has(newLanguage)) {
          this.store.dispatch(new ApplicationActions.SetCurrentReadyLanguage(newLanguage));
        }
      });
    });

    this.currentReadyLanguageSubscription = this.currentReadyLanguage$.subscribe((currentReadyLanguage) => {
      if (currentReadyLanguage) {
        this.store.dispatch(new SettingsActions.GetSavedCookies(currentReadyLanguage));
      }
    });
  }

  openSettingsModal(page): void {
    this.store.dispatch(new SettingsActions.SetSettingsModal(true));
  }
}
