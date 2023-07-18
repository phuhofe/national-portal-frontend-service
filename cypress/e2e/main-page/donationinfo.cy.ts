describe('Donationinfo', () => {
  it('has icon', () => {
    cy.visit('/minnesider/pages/donationinfo');
    cy.get('app-donationinfo-page').find('.image-icon').should('be.visible');
  });

  it('has text', () => {
    cy.visit('/minnesider/pages/donationinfo');
    cy.get('app-donationinfo-page').should('be.visible').contains('donasjon');
  });
});
