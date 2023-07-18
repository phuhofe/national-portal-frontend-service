import { Component, OnDestroy, OnInit } from '@angular/core';
import { NationalPortalCompanyName } from '@app/config';
import { Store } from '@ngxs/store';
import { SettingsActions } from 'src/app/settings/store/settings.actions';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit, OnDestroy {
  static setupMetaRobots(): void {
    const existingMetaRobots = document.querySelector('meta[name="robots"]');

    if (!existingMetaRobots) {
      const metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      metaRobots.content = 'noindex';
      document.head.appendChild(metaRobots);
    }
  }

  static deleteMetaRobots(): void {
    const existingMetaRobots = document.querySelector('meta[name="robots"]');

    if (existingMetaRobots) {
      document.head.removeChild(existingMetaRobots);
    }
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    PageNotFoundComponent.setupMetaRobots();
    this.store.dispatch(new SettingsActions.GetPortalSettingByCompany(NationalPortalCompanyName));
  }

  ngOnDestroy(): void {
    PageNotFoundComponent.deleteMetaRobots();
  }
}
