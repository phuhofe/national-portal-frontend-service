const getRootOrShadowElementSelector = (testGroupName: 'Hosted' | 'Embedded') => {
  if (testGroupName === 'Hosted') { 
    return cy.get('app-wrapper').shadow().find('adstate-settings-component');
   } else if (testGroupName === 'Embedded') {
    return cy.get('body adstate-settings-component').find('app-wrapper').shadow();
  }
 }; 

const runTestsOnUrl = (testGroupName: 'Hosted' | 'Embedded', url: string) => {
  it(`${testGroupName} - loads onto the page`, () => {
    cy.visit(url);
    getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('be.visible');
  });

  it(`${testGroupName} - hides when all cookies are accepted`, () => {
    cy.visit(url);

    // Accept all
    getRootOrShadowElementSelector(testGroupName).find('#cookie-pop-up-accept-all').click();

    // Check
    getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('not.be.visible');
  });

  it(`${testGroupName} - hides when only necessary cookies are accepted`, () => {
    cy.visit(url);

    // Accept only necessary
    getRootOrShadowElementSelector(testGroupName).find('#cookie-pop-up-only-necessary').click();

    // Check
    getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('not.be.visible');
  });

  it(`${testGroupName} - opens back up when event "adstate-settings-cookie-pop-up-open" is fired`, () => {
    if (testGroupName === 'Hosted') {
      cy.visit(`${url}minnesider/pages/privacy-policy`); // Privacy policy page
    } else if (testGroupName === 'Embedded') {
      cy.visit(url);
    }

    if (testGroupName === 'Hosted') {
      // Pop-up is closed by default on the privacy policy page, let's try to open back up
      cy.get('#privacy-policy-page-change-settings').click();
      cy.get('flora-cookie-pop-up').should('be.visible');
    } else if (testGroupName === 'Embedded') {
      // On embedded we have to first close it manually
      getRootOrShadowElementSelector(testGroupName).find('#cookie-pop-up-only-necessary').click();
      cy.get('#open-cookie').click();
      getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('be.visible');
    }
  });

  it(`${testGroupName} - has translated text`, () => {
    cy.visit(url);
    getRootOrShadowElementSelector(testGroupName)
      .find('flora-cookie-pop-up mat-card-title')
      .should('be.visible')
      .contains('Informasjonskapsler');
  });

  it(`${testGroupName} - translated text changes when language changes`, () => {
    cy.visit(url);

      // Check default Norwegian
    getRootOrShadowElementSelector(testGroupName)
      .find('flora-cookie-pop-up mat-card-title')
      .should('be.visible')
      .contains('Informasjonskapsler');

      // Switch to Swedish
    if (testGroupName === 'Hosted') {
      // Click see details (opens settings modal)
      getRootOrShadowElementSelector(testGroupName).find('#cookie-pop-up-see-details').click();

      // click language switcher
      getRootOrShadowElementSelector(testGroupName).find('flora-language-switcher').click();

      // click swedish
      cy.get('#cdk-overlay-0 button:nth-child(3)').click();

      // Click X (Close settings modal)
      getRootOrShadowElementSelector(testGroupName).find('#flora-settings-modal-close-button-desktop').click();
    } else if (testGroupName === 'Embedded') {
      // Close pop-up

      getRootOrShadowElementSelector(testGroupName).find('#cookie-pop-up-only-necessary').click();

      // Change language
      cy.get('#change-language').select('sv_SE');

      // Open back up for check
      cy.get('#open-cookie').click();
    }

    // Check Swedish
    getRootOrShadowElementSelector(testGroupName)
      .find('flora-cookie-pop-up mat-card-title')
      .should('be.visible')
      .contains('Cookies');
  });

  it(`${testGroupName} - loads Matomo without accepting any cookies`, () => {
    cy.visit(url);
    cy.get('script[src="https://matomo.production.ads1.itpartner.no/matomo.js"]').should('exist');
  });

  it(`${testGroupName} - loads Google Analytics when all cookies are accepted`, () => {
    cy.visit(url);

    // Accept all
    getRootOrShadowElementSelector(testGroupName).find('#cookie-pop-up-accept-all').click();

    // Check
    if (testGroupName === 'Hosted') {
      cy.get(`script[src="${window.location.origin}/assets/js/adstate-analytics.js"]`).should('exist');
    } else if (testGroupName === 'Embedded') {
      cy.get(`script[src="/assets/common/js/google-analytics.js"]`).should('exist');
    }
  });
  
  it(`${testGroupName} - cookie pop-up cannot be closed by clicking outside of it`, () => {
    cy.visit(url);

    getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('be.visible');

    // Click outside of cookie pop up
    cy.get('body').click(5, 5 )

    // Check
    getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('be.visible');
  });

  it(`${testGroupName} - cookie pop-up cannot be closed by pressing esc`, () => {
    cy.visit(url);

    getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('be.visible');

    // Pressing esc
    cy.get('body').type('{esc}');

    // Check
    getRootOrShadowElementSelector(testGroupName).find('flora-cookie-pop-up').should('be.visible');
  });

  it(`${testGroupName} - does not load Google Analytics when only necessary cookies are accepted`, () => {
    cy.visit(url);

    // Accept only necessary
    getRootOrShadowElementSelector(testGroupName).find('#cookie-pop-up-only-necessary').click();

    // Check
    cy.get(`script[src="${window.location.origin}/assets/js/adstate-analytics.js"]`).should('not.exist');
  });
};

describe('Settings component - Cookie pop-up', () => {
   runTestsOnUrl('Hosted', '/'); 
   runTestsOnUrl('Embedded', `${Cypress.env("baseUrlForEmbedded")}/settings-component/demo/`);
});
