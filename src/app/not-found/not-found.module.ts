import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotFoundRoutingModule } from './not-round-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { CardModule } from '@adstate_as/flora';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, TranslocoModule, CardModule, PagesModule],
  exports: [PageNotFoundComponent],
})
export class NotFoundModule {}
