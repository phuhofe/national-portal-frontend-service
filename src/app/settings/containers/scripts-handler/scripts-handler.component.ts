import { Component, Input, OnInit } from '@angular/core';
import { CustomerSiteServiceSettingsCompany } from '@app/core/interface/customer-service.interface';
import { CustomerSiteService } from '@app/core/services/customer-site.service';
import { Select } from '@ngxs/store';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { SettingsSelectors } from '../../store/settings.selectors';
import { environment } from '@app/env';
import { debounceTime } from 'rxjs/operators';

interface CookieScript {
  url: string;
  async?: boolean;
  defer?: boolean;
}

interface ScriptsData {
  gaTrackingId?: string;
  gtmTrackingId?: string;
}

declare global {
  interface Window {
    adstatePortalScriptsData: ScriptsData;
    _paq: any;
  }
}
@Component({
  selector: 'app-scripts-handler',
  templateUrl: './scripts-handler.component.html',
  styleUrls: ['./scripts-handler.component.scss'],
})
export class ScriptsHandlerComponent implements OnInit {
  @Select(SettingsSelectors.cookiesWithScripts)
  public cookiesWithScripts$: Observable<any[]>;

  @Select(SettingsSelectors.company)
  public company$: Observable<CustomerSiteServiceSettingsCompany>;

  private canLoadScripts = new BehaviorSubject<boolean>(false);
  private loadedScripts = [];
  private cookiesWithScriptsSubscription: Subscription;
  private currentCompanyId: number = null;
  private getSettingsForCompany = !environment.exportSettingsComponent;

  constructor(private customerSiteService: CustomerSiteService) {}

  ngOnInit(): void {
    this.company$.subscribe((company) => {
      if (company?.id && company.id !== this.currentCompanyId && this.getSettingsForCompany) {
        this.currentCompanyId = company.id;
        this.updateAnalyticsGlobals(company);
      } else if (company === undefined && !this.getSettingsForCompany) {
        this.canLoadScripts.next(true);
      }
    });
    this.canLoadScripts.subscribe(() => this.updateScripts());
  }

  updateAnalyticsGlobals(company): void {
    // We need to make these tracking IDs available to the window object, so the scripts loaded via cookies have access to them.
    this.customerSiteService
      .getAnalytics(company.id)
      .then((response) => {
        window.adstatePortalScriptsData = {
          gaTrackingId: response.gaTrackingId,
          gtmTrackingId: response.gtmTrackingId,
        };
        this.canLoadScripts.next(true);
      })
      .catch((error) => {
        console.warn(error);
        this.canLoadScripts.next(false);
      });
  }

  updateScripts(): void {
    if (this.cookiesWithScriptsSubscription) {
      this.cookiesWithScriptsSubscription.unsubscribe();
    }

    this.cookiesWithScriptsSubscription = this.cookiesWithScripts$.pipe(debounceTime(250)).subscribe((cookiesWithScripts) => {
      if (cookiesWithScripts) {
        cookiesWithScripts
          .filter((cookie) => cookie.checked && !this.loadedScripts.includes(cookie.slug) && this.canLoadScripts.value)
          .forEach((cookie) => {
            const loadedScriptIndex = this.loadedScripts.findIndex((loadedScript) => loadedScript.slug === cookie.slug);
            if (loadedScriptIndex === -1) {
              this.loadedScripts.push({ slug: cookie.slug, script: cookie.script });
            }
            this.addScriptToPage(cookie.script);
          });
      }

      this.loadedScripts.forEach((loadedScript, loadedScriptIndex) => {
        let loadedScriptIsSupposedToBeLoaded = false;

        cookiesWithScripts
          .filter((cookie) => cookie.slug === loadedScript.slug)
          .forEach(() => {
            if (!loadedScriptIsSupposedToBeLoaded) {
              loadedScriptIsSupposedToBeLoaded = true;
            }
          });

        if (!loadedScriptIsSupposedToBeLoaded && loadedScript.script !== null) {
          this.removeScriptFromPage(loadedScript.script);
          this.loadedScripts.splice(loadedScriptIndex, 1);
        }
      });
    });
  }

  addScriptToPage(options: CookieScript): void {
    const existingScript = document.querySelector(`script[src="${options.url}"`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = options.url;

      if (options.async) {
        script.async = true;
      }

      if (options.defer) {
        script.defer = true;
      }

      document.documentElement.lastChild.appendChild(script);
    }
  }

  removeScriptFromPage(options: CookieScript): void {
    try {
      const scriptElementToRemove = document.querySelector('script[src="' + options.url + '"]');
      if (scriptElementToRemove) {
        scriptElementToRemove.remove();
      }
    } catch (error) {
      console.error(`Couldn't remove script element from page`, error);
    }
  }
}
