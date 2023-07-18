import { CardModule } from '@adstate_as/flora';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Meta } from '@angular/platform-browser';
import { FooterModule } from '@app/core/containers/footer/footer.module';
import { HeaderModule } from '@app/core/containers/header/header.module';
import { TranslocoModule } from '@ngneat/transloco';
import { SettingsModule } from '../settings/settings.module';

import { CONTAINERS } from './containers';
import { PageTemplateComponent } from './containers/page-template/page-template.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [CONTAINERS],
  imports: [
    // App
    CommonModule,
    PagesRoutingModule,
    HeaderModule,
    FooterModule,
    SettingsModule,

    // Material
    MatButtonModule,
    MatIconModule,

    // Transloco
    TranslocoModule,

    // Flora
    CardModule,
  ],
  providers: [Meta],
  exports: [PageTemplateComponent],
})
export class PagesModule {}
