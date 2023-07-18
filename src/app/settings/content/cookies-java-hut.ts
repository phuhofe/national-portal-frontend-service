import { environment } from '@app/env';

export const settings = {
  privacyPolicyLink: '/pages/privacy-policy',
};

export const cookies = [
  {
    slug: 'necessary',
    title: 'cookiePopUp.description.necessary.title',
    description: 'cookiePopUp.description.necessary.description',
    icon: 'settings',
    checked: true,
    indeterminate: false,
    disabled: true,
    cookies: [
      {
        slug: 'settings-cookie-pop-up',
        title: 'cookiePopUp.description.necessary.cookies.popUp.title',
        description: 'cookiePopUp.description.necessary.cookies.popUp.description',
        expiry: 'cookiePopUp.description.necessary.cookies.popUp.expiry',
        type: 'cookiePopUp.description.necessary.cookies.popUp.type',
        checked: true,
        disabled: true,
      },
      {
        slug: 'settings-cookie-settings',
        title: 'cookiePopUp.description.necessary.cookies.save.title',
        description: 'cookiePopUp.description.necessary.cookies.save.description',
        expiry: 'cookiePopUp.description.necessary.cookies.save.expiry',
        type: 'cookiePopUp.description.necessary.cookies.save.type',
        checked: true,
        disabled: true,
      },
      {
        slug: 'settings-necessary-matomo',
        title: 'cookiePopUp.description.necessary.cookies.matomo.title',
        description: 'cookiePopUp.description.necessary.cookies.matomo.description',
        expiry: 'cookiePopUp.description.necessary.cookies.matomo.expiry',
        type: 'cookiePopUp.description.necessary.cookies.matomo.type',
        checked: true,
        disabled: true,
        scriptCanLoad: true,
        script: {
          url: `${environment.hostLink}/assets/js/matomo.js?matomoSiteId=1`,
          async: true,
        },
      },
    ],
  },
  {
    slug: 'performance',
    title: 'cookiePopUp.description.performance.title',
    description: 'cookiePopUp.description.performance.description',
    icon: 'speed',
    checked: false,
    indeterminate: false,
    disabled: false,
    cookies: [
      {
        slug: 'settings-performance-adstate-analytics',
        title: 'cookiePopUp.description.performance.cookies.analytics.title',
        description: 'cookiePopUp.description.performance.cookies.analytics.description',
        expiry: 'cookiePopUp.description.performance.cookies.analytics.expiry',
        type: 'cookiePopUp.description.performance.cookies.analytics.type',
        checked: false,
        disabled: false,
        scriptCanLoad: false,
        script: {
          url: `${environment.hostLink}/assets/js/adstate-analytics.js`,
          async: true,
        },
      },
    ],
  },
];
