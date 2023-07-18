import { CompanyBackgroundColor, dateRegex, minnesiderOrdersData, urlRequestMinnesider, yearRegex } from '../constants/passing-card';

describe('Passing card', () => {
  const APP_WRAPPER = 'app-wrapper';
  const FLORA_PASSING_CARD = 'flora-passing-card';
  const DATA_CY_PERSON_NAME = '[data-cy="person-name"]';
  const DATA_CY_PERSON_DEATH_DATE = '[data-cy="person-death-date"]';
  const DATA_CY_PERSON_BIRTHDATE = '[data-cy="person-birthdate"]';
  const DATA_CY_PERSON_DEATH_CITY = '[data-cy="person-deathcity"]';
  const DATA_CY_DEATH_NOTICE_ACTION_LINK = '[data-cy="death-notice-action-link"]';
  const DATA_CY_MEMORIAL_PAGE_ACTION_LINK = '[data-cy="memorial-page-action-link"]';
  const DATA_CY_DONATION_ACTION_LINK = '[data-cy="donation-action-link"]';
  const DATA_CY_FLOWERS_ACTION_LINK = '[data-cy="flowers-action-link"]';
  const DATA_CY_ORDER_PERSON_PHOTO = '[data-cy="order-person-photo"]';
  const DATA_CY_DEATH_NOTICE_ICON = '[data-cy="death-notice-icon"]';
  const DATA_CY_COOKIE_POP_UP_ACCEPT_ALL = '#cookie-pop-up-accept-all';
  const DATA_CY_FLORA_COOKIE_POP_UP = 'flora-cookie-pop-up';

  context('Minesider', () => {
    before(() => {
      cy.intercept(urlRequestMinnesider, { ...minnesiderOrdersData }).as('orders');
      cy.visit('/');
    });

    beforeEach(() => {
      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(DATA_CY_FLORA_COOKIE_POP_UP, { includeShadowDom: true })
        .get(DATA_CY_COOKIE_POP_UP_ACCEPT_ALL, { includeShadowDom: true })
        .click();

      cy.get(APP_WRAPPER, { includeShadowDom: true })
        .get(FLORA_PASSING_CARD, { includeShadowDom: true })
        .should('be.visible')
        .first()
        .shadow()
        .as('firstItem');
    });

    it('should be able to display person name', () => {
      cy.get('@firstItem').find(DATA_CY_PERSON_NAME).should('be.visible').should('be.not.empty');
    });

    it('should be able to display person birthdate', () => {
      cy.get('@firstItem')
        .find(DATA_CY_PERSON_BIRTHDATE)
        .invoke('text')
        .then((value) => {
          value = value.trim();
          if (value.length === 4) {
            expect(value).match(yearRegex);
          } else {
            expect(value).match(dateRegex);
          }
        });
    });

    it('should be able to display person death date', () => {
      cy.get('@firstItem')
        .find(DATA_CY_PERSON_DEATH_DATE)
        .invoke('text')
        .then((value) => {
          value = value.trim();
          if (value.length === 4) {
            expect(value).match(yearRegex);
          } else {
            expect(value).match(dateRegex);
          }
        });
    });

    it('should be able to display person death city', () => {
      cy.get('@firstItem').find(DATA_CY_PERSON_DEATH_CITY).should('be.visible').should('be.not.empty');
    });

    it('should be able to disable death-notice action', () => {
      cy.get('@firstItem')
        .find(DATA_CY_DEATH_NOTICE_ACTION_LINK)
        .invoke('attr', 'href')
        .then((value) => {
          expect(value).equal(undefined);
        });
    });

    it('should be able to enable memorial-page action', () => {
      cy.get('@firstItem').find(DATA_CY_MEMORIAL_PAGE_ACTION_LINK).invoke('attr', 'href').should('be.not.empty');
    });

    it('should be able to enable donation action', () => {
      cy.get('@firstItem')
        .find(DATA_CY_DONATION_ACTION_LINK)
        .invoke('attr', 'href')
        .then((value) => {
          expect(value).equal(undefined);
        });
    });

    it('should be able to enable flowers action', () => {
      cy.get('@firstItem').find(DATA_CY_FLOWERS_ACTION_LINK).invoke('attr', 'href').should('be.not.empty');
    });

    it('should be able to display loading photo', () => {
      cy.get('@firstItem').find(DATA_CY_ORDER_PERSON_PHOTO).invoke('attr', 'src').should('be.not.empty');
    });

    it('should display correct color', () => {
      cy.get('@firstItem')
        .find(DATA_CY_DEATH_NOTICE_ICON + ' .background')
        .should('be.visible')
        .should('have.css', 'background-color', CompanyBackgroundColor.minnesider);
    });
  });
});
