import { TranslocoService } from '@ngneat/transloco';

export const portalPageConfig = {
  loadingSpinnerImageUrl:
    'https://img.adstate.com/zVDeMr-9kYdPuBRbPwO7h-yqgSFZvk8D5D4Bcjs1kg0/rs:fit:0:0:1/czM6Ly9qYXZhLWh1dC1pbWdwcm94eS9mbG9yYS1yZXNvdXJjZXMvb3RoZXIvbG9hZGluZy1zcGlubmVyLnN2Zz9TcHJHU3pydTJXOWpOLmtWcjUwRmliQVk1MUZfQUQuSA.svg',
};

export const sortItemsTranslateHelper = (translateService: TranslocoService) => {
  return [
    {
      displayValue: translateService.translate('portalPage.sort.firstNameAToZ'),
      value: 'first_name,asc',
    },
    {
      displayValue: translateService.translate('portalPage.sort.firstNameZToA'),
      value: 'first_name,desc',
    },
    {
      displayValue: translateService.translate('portalPage.sort.lastNameAToZ'),
      value: 'last_name,asc',
    },
    {
      displayValue: translateService.translate('portalPage.sort.lastNameZToA'),
      value: 'last_name,desc',
    },
    {
      displayValue: translateService.translate('portalPage.sort.birthYearHighToLow'),
      value: 'birth_date,desc',
    },
    {
      displayValue: translateService.translate('portalPage.sort.birthYearLowToHigh'),
      value: 'birth_date,asc',
    },
    {
      displayValue: translateService.translate('portalPage.sort.deathYearHighToLow'),
      value: 'death_date,desc',
    },
    {
      displayValue: translateService.translate('portalPage.sort.deathYearLowToHigh'),
      value: 'death_date,asc',
    },
  ];
};
