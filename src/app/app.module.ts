import { NgModule, APP_INITIALIZER, ErrorHandler, enableProdMode } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingsModule } from './settings/settings.module';
import { CONTAINERS } from './core/containers';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CoreModule } from '@app/core/core.module';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@ngneat/transloco';
import { TranslocoRootModule } from './transloco-root/transloco-root.module';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import { environment } from '@app/env';
import { NotFoundModule } from './not-found/not-found.module';

import { getBaseHref } from './base-href';
import { BrowserModule } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

let sentryProviders = [];
if (environment.sentry.enabled) {
  Sentry.init({
    dsn: environment.sentry.dsn,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: environment.sentry.tracingOrigins,
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: environment.sentry.tracesSampleRate,
  });

  sentryProviders = [
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: environment.sentry.feedbackDialog,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ];
}

@NgModule({
  declarations: [AppComponent, CONTAINERS],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,

    // App
    CoreModule,
    AppRoutingModule,
    SettingsModule,
    NotFoundModule,

    // Transloco
    TranslocoRootModule,
    TranslocoModule,

    // Material
    MatRippleModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    ...sentryProviders,
    {
      provide: APP_BASE_HREF,
      useFactory: () => getBaseHref(),
    },
  ],
})
export class AppModule {
  constructor() {}
}
