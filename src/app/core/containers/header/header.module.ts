import { LanguageSwitcherModule, LogoModule, NavigationBarModule, NavigationMenuItemModule, NavigationMenuModule } from '@adstate_as/flora';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@app/core/containers/header/header.component';
import { TranslocoModule } from '@ngneat/transloco';
import { DownloadActionsModule } from '../download-actions/download-actions.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // Transloco
    TranslocoModule,

    // Angular Material
    MatIconModule,
    LayoutModule,

    // Flora
    LogoModule,
    NavigationBarModule,
    NavigationMenuItemModule,
    NavigationMenuModule,
    LanguageSwitcherModule,

    DownloadActionsModule
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
