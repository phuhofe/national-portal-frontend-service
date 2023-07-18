import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalGuard } from '../core/guard/portal.guard';
import { PageNotFoundComponent } from '../not-found/page-not-found/page-not-found.component';
import { environment } from '@app/env';
import { PortalPageComponent } from './containers/portal-page/portal-page.component';

const routes: Routes = [
  {
    path: '',
    component: PortalPageComponent,
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':company',
    component: PortalPageComponent,
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'pages/404',
    loadChildren: () => import('../not-found/not-found.module').then((m) => m.NotFoundModule),
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'pages',
    loadChildren: () => import('../pages/pages.module').then((m) => m.PagesModule),
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':company/pages',
    loadChildren: () => import('../pages/pages.module').then((m) => m.PagesModule),
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: '**',
    component: PortalPageComponent,
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      enableTracing: !environment.production,
    }),
  ],
  exports: [RouterModule],
})
export class EmbeddedPortalRoutingModule {}
