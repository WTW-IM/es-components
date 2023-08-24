describe('Drawer', () => {
  beforeEach(() => {
    cy.visit('/#!/Drawer');
  });

  describe('Free-Form Drawers', () => {
    it('opens and closes BOTH drawers with first button', () => {
      cy.get('#second-body').should('be.visible');

      cy.get('#first-opener').click();
      cy.get('#first-body').should('be.visible');
      cy.get('#second-body').should('be.visible');

      cy.get('#first-opener').click();
      cy.get('#first-body').should('not.be.visible');
      cy.get('#second-body').should('not.be.visible');
    });

    it('opens and closes just the second drawer with second button', () => {
      cy.get('#second-body').should('be.visible');

      cy.get('#second-opener').click();
      cy.get('#second-body').should('not.be.visible');

      cy.get('#second-opener').click();
      cy.get('#second-body').should('be.visible');
    });

    it('performs the onClick functionality with a Drawer.ItemOpener', () => {
      cy.get('#first-dynamic-value span').should($div =>
        expect($div).to.have.text('hello')
      );
      cy.get('#first-opener').click();
      cy.get('#first-dynamic-value span').should($div =>
        expect($div).to.have.text('world')
      );

      cy.get('#second-dynamic-value span').should($div =>
        expect($div).to.have.text('olleh')
      );
      cy.get('#second-opener').click();
      cy.get('#second-dynamic-value span').should($div =>
        expect($div).to.have.text('emit')
      );
    });
  });
});
