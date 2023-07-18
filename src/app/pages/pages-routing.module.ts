import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationinfoPageComponent } from './containers/donationinfo/donationinfo.component';
import { DownloadAppComponent } from './containers/download-app/download-app.component';
import { PageTemplateComponent } from './containers/page-template/page-template.component';
import { PrivacyPolicyPageComponent } from './containers/privacy-policy/privacy-policy.component';
import { PageResolverService } from './services/page-resolver.service';

const routes: Routes = [
  {
    path: 'app',
    component: DownloadAppComponent,
    data: {
      i18nPrefix: 'appDownloadPage',
      seoCanonicalUrl: '/app',
    },
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: PageTemplateComponent,
    data: {
      i18nPrefix: 'aboutPage',
      content: 'about',
    },
    resolve: {
      data: PageResolverService,
    },
    pathMatch: 'full',
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPageComponent,
    data: {
      i18nPrefix: 'privacyPolicyPage',
      content: 'privacy-policy',
    },
    resolve: {
      data: PageResolverService,
    },
    pathMatch: 'full',
  },
  {
    path: 'terms-and-conditions',
    component: PageTemplateComponent,
    data: {
      i18nPrefix: 'termsAndConditionsPage',
      content: 'terms-and-conditions',
    },
    resolve: {
      data: PageResolverService,
    },
    pathMatch: 'full',
  },
  {
    path: 'donationinfo',
    component: DonationinfoPageComponent,
    data: {
      i18nPrefix: 'donationInfoPage',
      content: 'donationinfo',
    },
    pathMatch: 'full',
    resolve: {
      data: PageResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
