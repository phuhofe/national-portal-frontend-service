describe('Main page', () => {
  it('has banner', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('app-wrapper').shadow().find('.banner').should('be.visible');
  });

  it('has search bar', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('app-wrapper').shadow().find('.search-button-desktop').should('be.visible');
  });

  it('has "Søk" text is present inside the search bar', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get('app-wrapper').shadow().find('.search-label-text').should('be.visible').contains('Søk');
  });
});
