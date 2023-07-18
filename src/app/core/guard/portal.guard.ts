import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NationalPortalCompanyName } from '@app/config';
import { environment } from '@app/env';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SettingsActions } from 'src/app/settings/store/settings.actions';
import { SettingsSelectors } from 'src/app/settings/store/settings.selectors';
import { ApplicationActions } from 'src/app/store/application.actions';

@Injectable({
  providedIn: 'root',
})
export class PortalGuard implements CanActivate {
  @Select(SettingsSelectors.companies) companies$: Observable<any>;
  @Select(SettingsSelectors.slugSettings) slugSettings$: Observable<any>;

  companies = [];
  slugSettings: any;
  currentCompany = null;

  constructor(private store: Store) {
    this.companies$.subscribe((companies) => {
      this.companies = companies;
    });

    this.slugSettings$.subscribe((slugSettings) => {
      this.slugSettings = slugSettings;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const companySlug = state.url.split('/');
    let companyName = companySlug[1] === '' ? NationalPortalCompanyName : companySlug[1];

    if (this.slugSettings.value && this.companies.includes(this.slugSettings.value)) {
      companyName = this.slugSettings.value;
    }

    if (this.currentCompany !== companyName) {
      this.store.dispatch(new ApplicationActions.NotFound(false));

      if (!environment.exportPortalComponent) {
        this.store.dispatch(new SettingsActions.GetPortalSettingByCompany(companyName));
      }
    }

    this.currentCompany = companyName;

    return true;
  }
}
