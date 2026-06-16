describe('Popover', () => {
  beforeEach(() => {
    cy.visit('/#!/Popover');
  });

  describe('Popovers', () => {
    it('opens and closes BOTH drawers with first button', () => {
      cy.findByRole('button', { name: /Popover on Top/i }).click();
      cy.findByRole('heading', { name: /Top/ }).should('be.visible');
      cy.scrollTo('bottom', { duration: 1000 });
      cy.findByRole('heading', { name: /Top/ }).should('not.exist');
    });
  });
});
