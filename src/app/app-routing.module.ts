import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalGuard } from './core/guard/portal.guard';
import { PageNotFoundComponent } from './not-found/page-not-found/page-not-found.component';
import { PageResolverService } from './pages/services/page-resolver.service';

const routes: Routes = [
  {
    path: 'pages/404',
    loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: ':company/pages',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
  { path: 'app', redirectTo: '/minnesider/pages/app', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./portal/portal.module').then((m) => m.PortalModule),
    canActivate: [PortalGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      i18nPrefix: 'notFoundPage',
      content: '404',
    },
    resolve: {
      data: PageResolverService,
    },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
