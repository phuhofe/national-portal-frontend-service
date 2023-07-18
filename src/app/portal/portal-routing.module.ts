import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './portal.component';

export const portalRoutes: Routes = [
  {
    path: '',
    component: PortalComponent,
  },
  {
    path: ':company',
    component: PortalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(portalRoutes)],
  exports: [RouterModule],
})
export class PortalRoutingModule {}
