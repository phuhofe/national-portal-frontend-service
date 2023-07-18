import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DownloadActionsComponent } from './download-actions.component';

@NgModule({
  declarations: [DownloadActionsComponent],
  imports: [CommonModule, RouterModule],
  exports: [DownloadActionsComponent],
})
export class DownloadActionsModule {}
