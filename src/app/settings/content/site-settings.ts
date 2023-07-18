import { ImageAlignment } from '@app/config';
import { SiteSettingsInterface } from '../store/settings.state';

export const siteSettings: SiteSettingsInterface = {
  theme: {
    value: 'minnesider',
  },
  slug: {
    value: null,
  },
  themeMedia: {
    value: {
      logo: {
        imageUrl:
          'https://img.adstate.com/zVDeMr-9kYdPuBRbPwO7h-yqgSFZvk8D5D4Bcjs1kg0/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvb3RoZXIvbG9hZGluZy1zcGlubmVyLnN2Zz9TcHJHU3pydTJXOWpOLmtWcjUwRmliQVk1MUZfQUQuSA.svg',
        align: ImageAlignment.LEFT,
        display: true,
      },
      banner: {
        imageUrl:
          'https://img.adstate.com/bUxAN2f1zCtFDxm2n5WuCPVO8bdzjeQQnD7Mv6ZA18k/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvb3RoZXIvbG9hZGluZy1oZWFkZXIuc3ZnP200V2haaGM5STZ5eXlpM08yc3RUWmZ3V2VKWjV0WlFN.svg',
        align: ImageAlignment.LEFT,
        display: true,
      },
    },
  },
  portalSettings: {
    value: {
      homePage: 'https://minnesider.no/',
      language: 'no',
      defaultSearchLocation: 'national',
      availableSearchLocations: ['national'],
      searchLayout: 'test-layout',
      initialSearch: false,
      loginUrl: '',
      searchConfig: {
        portal: {
          initialSearch: false,
          emptySearch: false,
          defaultPageSize: 50,
        },
        embedded: {
          initialSearch: false,
          emptySearch: false,
          defaultPageSize: 5,
        },
      },
    },
  },
  siteLinks: {
    value: { homePage: '/', loginUrl: '/login' },
  },
  siteLanguage: {
    value: null,
  },
};
