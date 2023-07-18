import { environment } from '@app/env';
import faker from 'faker';

const currentYear = new Date().getFullYear();

export const minnesiderOrdersData = {
  content: [
    {
      id: 3983824,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photoUrl: '',
      birthDate: getDateStringFromIsoDate(faker.date.between(currentYear - 110 + '-01-01', currentYear - 10 + '-01-01')),
      deathDate: getDateStringFromIsoDate(faker.date.past()),
      deathCity: faker.address.cityName(),
      birthYear: null,
      deathYear: null,
      hideDeathDate: false,
      services: {
        memorialPage:
          'https://adstateplussdemo.vareminnesider.no/memorial_page/memorial_page_personal_info.php?order_id=3983824&set_site_id=120&cat=home&sign=1a8b8907465102a1f6aa93fc347242f4',
        donation: '',
        flowerShop:
          'https://adstateplussdemo.vareminnesider.no/flower_shop/choose_delivery_type.php?order_id=3983824&set_site_id=120&action=buy_product&cat=flowers&hide_wizard=true&page_source=portal&sign=579f32aae01173eb925a3ad80638af45',
        deathNotice: '',
      },
      ceremony: {
        location: faker.address.cityName(),
        dateTime: getDateStringFromIsoDate(faker.date.between(Date(), currentYear + 1 + '-01-01')),
      },
      ranking: 0,
    },
    {
      id: 3983826,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photoUrl: '',
      birthDate: getDateStringFromIsoDate(faker.date.between(currentYear - 110 + '-01-01', currentYear - 10 + '-01-01')),
      deathDate: getDateStringFromIsoDate(faker.date.past()),
      deathCity: faker.address.cityName(),
      birthYear: null,
      deathYear: null,
      hideDeathDate: false,
      services: {
        memorialPage:
          'https://adstateplussdemo.vareminnesider.no/memorial_page/memorial_page_personal_info.php?order_id=3983826&set_site_id=120&cat=home&sign=c736d47e984d6eda464588b3556b749d',
        donation:
          'https://adstateplussdemo.vareminnesider.no/donation/memorial_donation.php?order_id=3983826&set_site_id=120&cat=MemorialDonation&action=new&sign=b317cd803be11496957ba50459752325',
        flowerShop:
          'https://adstateplussdemo.vareminnesider.no/flower_shop/choose_delivery_type.php?order_id=3983826&set_site_id=120&action=buy_product&cat=flowers&hide_wizard=true&page_source=portal&sign=17c101c4e77a8b31a9f5b7ec9d06fb19',
        deathNotice:
          'https://adstateplussdemo.vareminnesider.no/memorial_page/memorial_page_ads.php?order_id=3983826&set_site_id=120&cat=ads&sign=957db8153a1ae204184f12058a26496a',
      },
      ceremony: {
        location: faker.address.cityName(),
        dateTime: getDateStringFromIsoDate(faker.date.between(Date(), currentYear + 1 + '-01-01')),
      },
      ranking: 0,
    },
    {
      id: 3983822,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photoUrl:
        'https://dev.omp.adstate.net/stream_file.php?filename=3983822.png&type=profile_photo_preview&sign=8d959e9bead92a507f6f3f15f665b453',
      birthDate: getDateStringFromIsoDate(faker.date.between(currentYear - 110 + '-01-01', currentYear - 10 + '-01-01')),
      deathDate: getDateStringFromIsoDate(faker.date.past()),
      deathCity: faker.address.cityName(),
      birthYear: null,
      deathYear: null,
      hideDeathDate: false,
      services: {
        memorialPage: '',
        donation:
          'https://adstateplussdemo.vareminnesider.no/donation/memorial_donation.php?order_id=3983822&set_site_id=120&cat=MemorialDonation&action=new&sign=dfe21ce31618fd6ddb394e65a0261c34',
        flowerShop:
          'https://adstateplussdemo.vareminnesider.no/flower_shop/choose_delivery_type.php?order_id=3983822&set_site_id=120&action=buy_product&cat=flowers&hide_wizard=true&page_source=portal&sign=69b890a5afe92d8a6ab0a252e2f644d2',
        deathNotice: '',
      },
      ceremony: {
        location: faker.address.cityName(),
        dateTime: getDateStringFromIsoDate(faker.date.between(Date(), currentYear + 1 + '-01-01')),
      },
      ranking: 0,
    },
    {
      id: 3983818,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photoUrl:
        'https://dev.omp.adstate.net/stream_file.php?filename=3983818.png&type=profile_photo_preview&sign=ae95a31eb5d3824852df56fd6f119108',
      birthDate: getDateStringFromIsoDate(faker.date.between(currentYear - 110 + '-01-01', currentYear - 10 + '-01-01')),
      deathDate: getDateStringFromIsoDate(faker.date.past()),
      deathCity: faker.address.cityName(),
      birthYear: null,
      deathYear: null,
      hideDeathDate: false,
      services: {
        memorialPage: '',
        donation:
          'https://adstateplussdemo.vareminnesider.no/donation/memorial_donation.php?order_id=3983818&set_site_id=120&cat=MemorialDonation&action=new&sign=12c13c3d1232638e2ceb617630fe935e',
        flowerShop:
          'https://adstateplussdemo.vareminnesider.no/flower_shop/choose_delivery_type.php?order_id=3983818&set_site_id=120&action=buy_product&cat=flowers&hide_wizard=true&page_source=portal&sign=2a1960ba5ea3e500ff3e5df1f7c01d6c',
        deathNotice: '',
      },
      ceremony: {
        location: faker.address.cityName(),
        dateTime: getDateStringFromIsoDate(faker.date.between(Date(), currentYear + 1 + '-01-01')),
      },
      ranking: 0,
    },
    {
      id: 3983820,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photoUrl: '',
      birthDate: getDateStringFromIsoDate(faker.date.between(currentYear - 110 + '-01-01', currentYear - 10 + '-01-01')),
      deathDate: getDateStringFromIsoDate(faker.date.past()),
      deathCity: faker.address.cityName(),
      birthYear: null,
      deathYear: null,
      hideDeathDate: false,
      services: {
        memorialPage: '',
        donation:
          'https://adstateplussdemo.vareminnesider.no/donation/memorial_donation.php?order_id=3983820&set_site_id=120&cat=MemorialDonation&action=new&sign=d73384fb04adb44e924eaa1b57077e0d',
        flowerShop:
          'https://adstateplussdemo.vareminnesider.no/flower_shop/choose_delivery_type.php?order_id=3983820&set_site_id=120&action=buy_product&cat=flowers&hide_wizard=true&page_source=portal&sign=0761287874b8d8ca2e9729fd7b0a1f75',
        deathNotice: '',
      },
      ceremony: {
        location: faker.address.cityName(),
        dateTime: getDateStringFromIsoDate(faker.date.between(Date(), currentYear + 1 + '-01-01')),
      },
      ranking: 0,
    },
  ],
  pageable: {
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
    offset: 0,
    pageSize: 5,
    pageNumber: 0,
    paged: true,
    unpaged: false,
  },
  totalPages: 2,
  totalElements: 10,
  last: false,
  size: 5,
  number: 0,
  sort: {
    empty: true,
    unsorted: true,
    sorted: false,
  },
  numberOfElements: 5,
  first: true,
  empty: false,
};

function getDateStringFromIsoDate(date: Date): string {
  return date.toISOString().substring(0, 10);
}

export const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-.](0?[1-9]|1[012])[\/\-.]\d{4}$/;

export const yearRegex = /^\d{4}$/;

export enum Companies {
  minnesider = 'minnesider',
  fonus = 'fonus',
}

export enum CompanyBackgroundColor {
  minnesider = 'rgb(105, 25, 130)',
  fonus = 'rgb(0, 47, 93)',
}

export const urlRequestMinnesider = environment.portalServiceApiBaseURL + '/v2/search?page=0&size=5&domain=vareminnesider.no&area=local';

export const urlRequestFonus = environment.portalServiceApiBaseURL + '/search?domain=minnessidor.fonus.se&page=0&size=5&area=local';
