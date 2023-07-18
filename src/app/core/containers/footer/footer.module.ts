import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';

import { FooterModule as FooterLibraryModule } from '@adstate_as/flora';
import { DownloadActionsModule } from '../download-actions/download-actions.module';


@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,

    FooterLibraryModule,

    DownloadActionsModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
