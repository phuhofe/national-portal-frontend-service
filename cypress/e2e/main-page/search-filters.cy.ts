import {
  Birthday,
  CityId,
  Deathday,
  FirstName,
  LastName,
  mapDataOrders,
  RegionId,
  urlRequestMinnesider,
} from '../constants/search-filters';

describe('Search Filter', () => {
  const APP_WRAPPER = 'app-wrapper';
  const FLORA_FILTER = 'flora-filter';
  const DATA_CY_FULL_NAME = '[data-cy="person-name"]';
  const DATA_CY_COOKIE_POP_UP_ACCEPT_ALL = '[data-cy="cookie-pop-up-accept-all"]';
  const DATA_CY_FLORA_COOKIE_POP_UP = 'flora-cookie-pop-up';
  const DATA_CY_FILTER_BUTTON_ACTION = '[data-cy="filter-button-action"]';
  const DATA_CY_FIRST_NAME_INPUT = '[data-cy="first-name-input"]';
  const DATA_CY_LAST_NAME_INPUT = '[data-cy="last-name-input"]';
  const DATA_CY_SUBMIT_FILTER = '[data-cy="submit-filter"]';
  const DATA_CY_BIRTHDATE_FILTER = '[data-cy="birthday-filter"]';
  const DATA_CY_DEATHDAY_FILTER = '[data-cy="deathday-filter"]';
  const DATA_CY_DATE_INPUT = '[data-cy="date-input"]';
  const DATA_CY_REGION_INPUT = '[data-cy="region-input"]';
  const DATA_CY_REGION_OPTIONS = '[data-cy="region-options"]';
  const DATA_CY_CITY_INPUT = '[data-cy="city-input"]';
  const DATA_CY_CITY_OPTIONS = '[data-cy="city-options"]';

  context('Filter FirstName', () => {
    before(() => {
      cy.intercept(
        urlRequestMinnesider({ page: 0, size: 5, domain: 'vareminnesider.no', area: 'local', firstName: FirstName, isApply: true }),
        mapDataOrders()
      ).as('orders');

      cy.visit('/');
      cy.wait(4000);

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .should('be.visible')
        .click();
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(FLORA_FILTER, { includeShadowDom: true }).as('floraFilter');
      cy.get('@floraFilter').get(DATA_CY_FILTER_BUTTON_ACTION, { includeShadowDom: true }).should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_FIRST_NAME_INPUT, { includeShadowDom: true }).type(FirstName, { force: true });
      cy.wait(2000);
      cy.get('@floraFilter').get(DATA_CY_SUBMIT_FILTER, { includeShadowDom: true }).should('be.visible').click();
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(DATA_CY_FULL_NAME, { includeShadowDom: true }).as('listItemFullName');
    });

    it('should be able to display correct first name', () => {
      cy.get('@listItemFullName').each(($li: any, index) => {
        expect($li[0].childNodes[0]['innerText'].toLowerCase()).contains(FirstName.toLowerCase());
      });
    });
  });

  context('Filter LastName', () => {
    before(() => {
      cy.intercept(
        urlRequestMinnesider({ page: 0, size: 5, domain: 'vareminnesider.no', area: 'local', lastName: LastName, isApply: true }),
        mapDataOrders()
      ).as('orders');

      cy.visit('/');
      cy.wait(4000);

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .should('be.visible')
        .click();
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(FLORA_FILTER, { includeShadowDom: true }).as('floraFilter');
      cy.get('@floraFilter').get(DATA_CY_FILTER_BUTTON_ACTION, { includeShadowDom: true }).should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_LAST_NAME_INPUT, { includeShadowDom: true }).type(LastName, { force: true });
      cy.wait(2000);
      cy.get('@floraFilter').get(DATA_CY_SUBMIT_FILTER, { includeShadowDom: true }).should('be.visible').click();
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(DATA_CY_FULL_NAME, { includeShadowDom: true }).as('listItemFullName');
    });

    it('should be able to display correct last name', () => {
      cy.get('@listItemFullName').each(($li: any, index) => {
        expect($li[0].childNodes[2]['innerText'].toLowerCase()).contains(LastName.toLowerCase());
      });
    });
  });

  context('Filter FirstName and LastName', () => {
    before(() => {
      cy.intercept(
        urlRequestMinnesider({
          page: 0,
          size: 5,
          domain: 'vareminnesider.no',
          area: 'local',
          firstName: FirstName,
          lastName: LastName,
          isApply: true,
        }),
        mapDataOrders()
      ).as('orders');

      cy.visit('/');
      cy.wait(4000);

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .should('be.visible')
        .click();
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(FLORA_FILTER, { includeShadowDom: true }).as('floraFilter');
      cy.get('@floraFilter').get(DATA_CY_FILTER_BUTTON_ACTION, { includeShadowDom: true }).should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_FIRST_NAME_INPUT, { includeShadowDom: true }).type(FirstName, { force: true });
      cy.get('@floraFilter').get(DATA_CY_LAST_NAME_INPUT, { includeShadowDom: true }).type(LastName, { force: true });
      cy.wait(2000);
      cy.get('@floraFilter').get(DATA_CY_SUBMIT_FILTER, { includeShadowDom: true }).should('be.visible').click();
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(DATA_CY_FULL_NAME, { includeShadowDom: true }).as('listItemFullName');
    });

    it('should be able to display correct first name and last name', () => {
      cy.get('@listItemFullName').each(($li: any, index) => {
        expect($li[0].childNodes[0]['innerText'].toLowerCase()).contains(FirstName.toLowerCase());
        expect($li[0].childNodes[2]['innerText'].toLowerCase()).contains(LastName.toLowerCase());
      });
    });
  });

  context('Filter Birthday and FirstName, LastName', () => {
    before(() => {
      cy.intercept(
        urlRequestMinnesider({
          page: 0,
          size: 5,
          domain: 'vareminnesider.no',
          area: 'local',
          firstName: FirstName,
          lastName: LastName,
          birthDate: Birthday,
          isApply: true,
        }),
        mapDataOrders()
      ).as('orders');

      cy.visit('/');
      cy.wait(4000);

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .should('be.visible')
        .click();
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(FLORA_FILTER, { includeShadowDom: true }).as('floraFilter');
      cy.get('@floraFilter').get(DATA_CY_FILTER_BUTTON_ACTION, { includeShadowDom: true }).should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_FIRST_NAME_INPUT, { includeShadowDom: true }).type(FirstName, { force: true });
      cy.get('@floraFilter').get(DATA_CY_LAST_NAME_INPUT, { includeShadowDom: true }).type(LastName, { force: true });
      cy.get('@floraFilter')
        .get(DATA_CY_BIRTHDATE_FILTER, { includeShadowDom: true })
        .get(DATA_CY_DATE_INPUT, { includeShadowDom: true })
        .first()
        .type(Birthday, { force: true });
      cy.wait(2000);
      cy.get('@floraFilter').get(DATA_CY_SUBMIT_FILTER, { includeShadowDom: true }).should('be.visible').click();
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(DATA_CY_FULL_NAME, { includeShadowDom: true }).as('listItemFullName');
    });

    it('should be able to display correct first name and last name', () => {
      cy.get('@listItemFullName').each(($li: any, index) => {
        expect($li[0].childNodes[0]['innerText'].toLowerCase()).contains(FirstName.toLowerCase());
        expect($li[0].childNodes[2]['innerText'].toLowerCase()).contains(LastName.toLowerCase());
      });
    });
  });

  context('Filter Deathday and FirstName, LastName', () => {
    before(() => {
      cy.intercept(
        urlRequestMinnesider({
          page: 0,
          size: 5,
          domain: 'vareminnesider.no',
          area: 'local',
          firstName: FirstName,
          lastName: LastName,
          deathDate: Deathday,
          isApply: true,
        }),
        mapDataOrders()
      ).as('orders');

      cy.visit('/');
      cy.wait(4000);

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .click();
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(FLORA_FILTER, { includeShadowDom: true }).as('floraFilter');
      cy.get('@floraFilter').get(DATA_CY_FILTER_BUTTON_ACTION, { includeShadowDom: true }).should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_FIRST_NAME_INPUT, { includeShadowDom: true }).type(FirstName, { force: true });
      cy.get('@floraFilter').get(DATA_CY_LAST_NAME_INPUT, { includeShadowDom: true }).type(LastName, { force: true });
      cy.get('@floraFilter')
        .get(DATA_CY_DEATHDAY_FILTER, { includeShadowDom: true })
        .get(DATA_CY_DATE_INPUT, { includeShadowDom: true })
        .last()
        .should('be.visible')
        .type(Deathday, { force: true });
      cy.wait(2000);
      cy.get('@floraFilter').get(DATA_CY_SUBMIT_FILTER, { includeShadowDom: true }).should('be.visible').click();
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(DATA_CY_FULL_NAME, { includeShadowDom: true }).as('listItemFullName');
    });

    it('should be able to display correct first name and last name', () => {
      cy.get('@listItemFullName').each(($li: any, index) => {
        expect($li[0].childNodes[0]['innerText'].toLowerCase()).contains(FirstName.toLowerCase());
        expect($li[0].childNodes[2]['innerText'].toLowerCase()).contains(LastName.toLowerCase());
      });
    });
  });

  context('Filter Region and FirstName, LastName', () => {
    before(() => {
      cy.intercept(
        urlRequestMinnesider({
          page: 0,
          size: 5,
          domain: 'vareminnesider.no',
          area: 'local',
          firstName: FirstName,
          lastName: LastName,
          regionId: RegionId,
          isApply: true,
        }),
        mapDataOrders()
      ).as('orders');

      cy.visit('/');
      cy.wait(4000);

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .click();
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(FLORA_FILTER, { includeShadowDom: true }).as('floraFilter');
      cy.get('@floraFilter').get(DATA_CY_FILTER_BUTTON_ACTION, { includeShadowDom: true }).should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_FIRST_NAME_INPUT, { includeShadowDom: true }).type(FirstName, { force: true });
      cy.get('@floraFilter').get(DATA_CY_LAST_NAME_INPUT, { includeShadowDom: true }).type(LastName, { force: true });
      cy.get('@floraFilter').get(DATA_CY_REGION_INPUT, { includeShadowDom: true }).first().should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_REGION_OPTIONS, { includeShadowDom: true }).should('be.visible').first().click();
      cy.wait(2000);
      cy.get('@floraFilter').get(DATA_CY_SUBMIT_FILTER, { includeShadowDom: true }).should('be.visible').click();
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(DATA_CY_FULL_NAME, { includeShadowDom: true }).as('listItemFullName');
    });

    it('should be able to display correct first name and last name', () => {
      cy.get('@listItemFullName').each(($li: any, index) => {
        expect($li[0].childNodes[0]['innerText'].toLowerCase()).contains(FirstName.toLowerCase());
        expect($li[0].childNodes[2]['innerText'].toLowerCase()).contains(LastName.toLowerCase());
      });
    });
  });

  context('Filter Region, City and FirstName, LastName', () => {
    before(() => {
      cy.intercept(
        urlRequestMinnesider({
          page: 0,
          size: 5,
          domain: 'vareminnesider.no',
          area: 'local',
          firstName: FirstName,
          lastName: LastName,
          cityId: CityId,
          regionId: RegionId,
          isApply: true,
        }),
        mapDataOrders()
      ).as('orders');

      cy.visit('/');
      cy.wait(4000);

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .should('be.visible')
        .click();
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(FLORA_FILTER, { includeShadowDom: true }).as('floraFilter');
      cy.get('@floraFilter').get(DATA_CY_FILTER_BUTTON_ACTION, { includeShadowDom: true }).should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_FIRST_NAME_INPUT, { includeShadowDom: true }).type(FirstName, { force: true });
      cy.get('@floraFilter').get(DATA_CY_LAST_NAME_INPUT, { includeShadowDom: true }).type(LastName, { force: true });
      cy.get('@floraFilter').get(DATA_CY_REGION_INPUT, { includeShadowDom: true }).first().should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_REGION_OPTIONS, { includeShadowDom: true }).should('be.visible').first().click();
      cy.get('@floraFilter').get(DATA_CY_CITY_INPUT, { includeShadowDom: true }).first().should('be.visible').click();
      cy.get('@floraFilter').get(DATA_CY_CITY_OPTIONS, { includeShadowDom: true }).should('be.visible').first().click();
      cy.wait(2000);
      cy.get('@floraFilter').get(DATA_CY_SUBMIT_FILTER, { includeShadowDom: true }).should('be.visible').click();
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true }).get(DATA_CY_FULL_NAME, { includeShadowDom: true }).as('listItemFullName');
    });

    it('should be able to display correct first name and last name', () => {
      cy.get('@listItemFullName').each(($li: any, index) => {
        expect($li[0].childNodes[0]['innerText'].toLowerCase()).contains(FirstName.toLowerCase());
        expect($li[0].childNodes[2]['innerText'].toLowerCase()).contains(LastName.toLowerCase());
      });
    });
  });
});
