import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { environment } from '@app/env';
import { SERVICES } from './services';
import { initializeKeycloak } from '../keycloack-helper';
import { ApiPrefixInterceptor, ErrorHandlerInterceptor, HttpTokenInterceptor } from './interceptors';
import { PortalState } from '../portal/store/portal.state';
import { SettingsState } from '../settings/store/settings.state';
import { ApplicationState } from '../store/application.state';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    TranslocoModule,
    NgxsLoggerPluginModule.forRoot({
      disabled: !environment.debug.ngxs,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsModule.forRoot([PortalState, SettingsState, ApplicationState], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiPrefixInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    SERVICES,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded, make sure to only import it once!');
    }
  }
}
