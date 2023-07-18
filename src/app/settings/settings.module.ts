import { Injector, NgModule } from '@angular/core';
import { CookiePopUpModule, SettingsModalModule, SettingToggleModule } from '@adstate_as/flora';
import { MatButtonModule } from '@angular/material/button';
import { CONTAINERS } from './containers';
import { SettingsComponent } from './settings.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslocoRootModule } from '../transloco-root/transloco-root.module';
import { CoreModule } from '@app/core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '@app/env';
import { TranslocoModule } from '@ngneat/transloco';
import { TagName } from '@app/config';
import { HttpClientModule } from '@angular/common/http';
import { WebComponentModule } from '../web-component';
import { PrivacyPolicyLinkPipe } from './pipe/privacy-policy-link.pipe';
import { WrapperModule } from '@app/wrapper';

const embeddedImports = environment.exportSettingsComponent
  ? [
      // Angular
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,

      // Application
      CoreModule,

      // Transloco
      TranslocoRootModule,
    ]
  : [];

@NgModule({
  declarations: [CONTAINERS, SettingsComponent, PrivacyPolicyLinkPipe],
  imports: [
    embeddedImports,

    // Angular
    CommonModule,

    // Transloco
    TranslocoModule,

    // Flora
    CookiePopUpModule,
    SettingsModalModule,
    SettingToggleModule,

    // Material
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    WrapperModule,
  ],
  exports: [SettingsComponent],
  bootstrap: [SettingsComponent],
})
export class SettingsModule extends WebComponentModule {
  constructor(readonly injector: Injector) {
    super(injector, SettingsComponent, TagName.SettingsComponent);
  }
}
