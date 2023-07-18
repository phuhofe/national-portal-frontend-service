import { NationalPortalCompanyName, ImageAlignment, ThemeColorTypes } from '@app/config';

export const fallbackSiteSettings = {
  company: {
    id: 1,
    name: NationalPortalCompanyName,
  },
  themes: [
    {
      id: 1,
      logo: {
        imageUrl:
          'https://img.adstate.com/MTAQldm0JSYxYbF7YQ8nSEPSAVLlu1YuKJncn1d8sY4/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mdW5lcmFsLWhvbWVzLXJlc291cmNlcy9taW5uZXNpZGVyL2xvZ28uc3ZnPzE4Tl96SDVQN3VndlNiUzdkY3F3bjBpU2FDVHVwV0dM.svg',
        align: ImageAlignment.LEFT,
        display: true,
      },
      banner: {
        imageUrl:
          'https://img.adstate.com/pQc-gtAUrahvaDSDf5bnoHax56hoCmOuervX9hP0eBU/rs:fit:1400:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mdW5lcmFsLWhvbWVzLXJlc291cmNlcy9taW5uZXNpZGVyL2Jhbm5lci5qcGc_dTNKWmszTk5ScTJXVHhlT1NiREtKWXEuQ2lPZ01zb2Q.jpg',
        align: ImageAlignment.LEFT,
        display: true,
      },
      colors: [
        {
          type: ThemeColorTypes.PRIMARY,
          baseColor: '#73738c',
          palette: {
            50: 'hsl(240, 9.79%, 95%)',
            100: 'hsl(240, 9.79%, 90%)',
            200: 'hsl(240, 9.79%, 80%)',
            300: 'hsl(240, 9.79%, 70%)',
            400: 'hsl(240, 9.79%, 60%)',
            500: 'hsl(240, 9.79%, 50%)',
            600: 'hsl(240, 9.79%, 40%)',
            700: 'hsl(240, 9.79%, 30%)',
            800: 'hsl(240, 9.79%, 20%)',
            900: 'hsl(240, 9.79%, 10%)',
            'contrast-saturated-50': 'hsl(240, 9.79%, 49%)',
            'contrast-saturated-100': 'hsl(240, 9.79%, 48%)',
            'contrast-saturated-200': 'hsl(240, 9.79%, 37%)',
            'contrast-saturated-300': 'hsl(240, 9.79%, 25%)',
            'contrast-saturated-400': 'hsl(240, 9.79%, 9%)',
            'contrast-saturated-500': 'hsl(240, 9.79%, 92%)',
            'contrast-saturated-600': 'hsl(240, 9.79%, 83%)',
            'contrast-saturated-700': 'hsl(240, 9.79%, 74%)',
            'contrast-saturated-800': 'hsl(240, 9.79%, 66%)',
            'contrast-saturated-900': 'hsl(240, 9.79%, 61%)',
            'a-100': 'hsl(240, 9.79%, 90%)',
            'a-200': 'hsl(240, 9.79%, 80%)',
            'a-400': 'hsl(240, 9.79%, 60%)',
            'a-700': 'hsl(240, 9.79%, 30%)',
            'contrast-saturated-a-100': 'hsl(240, 9.79%, 34%)',
            'contrast-saturated-a-200': 'hsl(240, 9.79%, 23%)',
            'contrast-saturated-a-400': 'hsl(240, 9.79%, 0%)',
            'contrast-saturated-a-700': 'hsl(240, 9.79%, 86%)',
            'contrast-unsaturated-50': 'hsl(240, 9.79%, 31%)',
            'contrast-unsaturated-100': 'hsl(240, 9.79%, 29%)',
            'contrast-unsaturated-200': 'hsl(240, 9.79%, 22%)',
            'contrast-unsaturated-300': 'hsl(240, 9.79%, 15%)',
            'contrast-unsaturated-400': 'hsl(240, 9.79%, 3%)',
            'contrast-unsaturated-500': 'hsl(240, 9.79%, 100%)',
            'contrast-unsaturated-600': 'hsl(240, 9.79%, 100%)',
            'contrast-unsaturated-700': 'hsl(240, 9.79%, 92%)',
            'contrast-unsaturated-800': 'hsl(240, 9.79%, 76%)',
            'contrast-unsaturated-900': 'hsl(240, 9.79%, 65%)',
          },
        },
      ],
    },
  ],
  portalSettings: {
    homePage: 'https://minnesider.no/',
    loginUrl:
      'https://vareminnesider.no/login.php?original_page=%2Findex.php%3Fsign%3D39cb4f8d032fe87e47bc628d237134e1&sign=20f1b84125d69992c8fac0a2808cf65c',
    language: 'nb_NO',
    defaultSearchLocation: 'national',
    availableSearchLocations: ['national'],
    searchLayout: 'default-layout',
    initialSearch: true,
  },
};
