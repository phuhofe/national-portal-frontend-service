describe('Footer', () => {
  it('is visible on page', () => {
    cy.visit('/');
    cy.get('app-wrapper').shadow().find('#footer').should('be.visible');
  });

  it('has description', () => {
    cy.visit('/');
    cy.get('app-wrapper').shadow().find('#footer').contains('Minnesider er en portal');
  });
});
