import { Injector, NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { FilterModule, SearchModule, SortModule, SearchResultModule } from '@adstate_as/flora';
import { CONTAINERS } from './containers';
import { PortalRoutingModule } from './portal-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from '@app/core/interceptors';
import { BrowserModule, Meta } from '@angular/platform-browser';
import { PortalComponent } from './portal.component';
import { SettingsModule } from '../settings/settings.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '@app/env';
import { TranslocoRootModule } from '../transloco-root/transloco-root.module';
import { HeaderModule } from '@app/core/containers/header/header.module';
import { getBaseHref } from '../base-href';
import { EmbeddedPortalRoutingModule } from './embedded-portal-routing.module';
import { CoreModule } from '@app/core/core.module';
import { TagName } from '@app/config';
import { WebComponentModule } from '../web-component';
import { FooterModule } from '@app/core/containers/footer/footer.module';
import { WrapperModule } from '@app/wrapper';

const embeddedImports = environment.exportPortalComponent
  ? [
      // Angular
      BrowserModule,
      BrowserAnimationsModule,

      // Application
      CoreModule,
      EmbeddedPortalRoutingModule,

      // Transloco
      TranslocoRootModule,
    ]
  : [
      // Application
      PortalRoutingModule,
    ];

const embeddedProviders = environment.exportPortalComponent
  ? [
      {
        provide: APP_BASE_HREF,
        useFactory: () => getBaseHref(),
      },
    ]
  : [];

@NgModule({
  declarations: [CONTAINERS, PortalComponent],
  imports: [
    embeddedImports,

    // Angular
    CommonModule,

    // Application
    HeaderModule,
    FooterModule,
    SettingsModule,

    // Material
    MatRippleModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,

    // Transloco
    TranslocoModule,

    // Flora
    SearchModule,
    SortModule,
    FilterModule,
    SearchResultModule,
    WrapperModule,
  ],
  exports: [PortalComponent],
  bootstrap: [PortalComponent],
  providers: [...embeddedProviders, Meta, { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true }],
})
export class PortalModule extends WebComponentModule {
  constructor(injector: Injector) {
    super(injector, PortalComponent, TagName.AdstatePortal);
  }
}
