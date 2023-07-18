import { environment } from '@app/env';

export const settings = {
  privacyPolicyLink: '/index.php?page_id=333&sign=f2e4c384993bb596d7c8dac776c6c237',
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
        slug: 'JSESSIONID',
        title: 'cookiePopUp.description.necessary.cookies.newRelic.title',
        description: 'cookiePopUp.description.necessary.cookies.newRelic.description',
        expiry: 'cookiePopUp.description.necessary.cookies.newRelic.expiry',
        type: 'cookiePopUp.description.necessary.cookies.newRelic.type',
        checked: true,
        disabled: true,
      },
      {
        slug: 'PHPSESSID',
        title: 'cookiePopUp.description.necessary.cookies.phpSession.title',
        description: 'cookiePopUp.description.necessary.cookies.phpSession.description',
        expiry: 'cookiePopUp.description.necessary.cookies.phpSession.expiry',
        type: 'cookiePopUp.description.necessary.cookies.phpSession.type',
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
        slug: '_ga, _gid, _gat, _gat_UA-XXXXXX-Y',
        title: 'cookiePopUp.description.performance.cookies.googleAnalytics.title',
        description: 'cookiePopUp.description.performance.cookies.googleAnalytics.description',
        expiry: 'cookiePopUp.description.performance.cookies.googleAnalytics.expiry',
        type: 'cookiePopUp.description.performance.cookies.googleAnalytics.type',
        checked: false,
        disabled: false,
        scriptCanLoad: false,
        script: {
          url: '/assets/common/js/google-analytics.js',
          async: true,
        },
      },
    ],
  },
];
