import faker from 'faker';
import { environment } from '@app/env';


export const urlRequest = environment.portalServiceApiBaseURL + '/v2/search?';
export const Size = 5;
export const FirstName = 'Ola';
export const LastName = 'Andersen';
export const Birthday = '1956-02-10';
export const Deathday = '2020-04-10';
export const Region = 'Agder';
export const RegionId = '0';
export const CityId = '0';

const currentYear = new Date().getFullYear();

export const urlRequestMinnesider = (filter: object) => {
  let params = '';
  for (const [index, [key, value]] of Object.entries(Object.entries(filter))) {
    if (Number(index) === 0) {
      params += key + '=' + value;
    } else {
      params += '&' + key + '=' + value;
    }
  }

  return urlRequest + params;
};

export const mapDataOrders = () => {
  let content = [];
  for (let i = 0; i < Size; i++) {
    const item = {
      id: currentYear + i,
      firstName: faker.fake(FirstName) + ' ' +  i,
      lastName: faker.fake(LastName),
      photoUrl: '',
      birthDate: faker.fake(Birthday),
      deathDate: faker.fake(Deathday),
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
    };
    content.push(item);
  }

  return {
    content,
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
};

function getDateStringFromIsoDate(date: Date): string {
  return date.toISOString().substring(0, 10);
}
