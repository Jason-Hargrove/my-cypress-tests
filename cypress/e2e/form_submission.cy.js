describe('Reseller Registration Form', () => {
    it('fills out and submits the form', () => {
      cy.visit('/support/reseller-registration');
  
      // Fill out form fields
      cy.get('input[name="businessName"]').type('My Test Business'); // Update the selector
      cy.get('input[name="email"]').type('testemail@example.com');
      cy.get('input[name="phone"]').type('123-456-7890');
      cy.get('input[name="website"]').type('https://example.com');
  
      // Submit the form
      cy.get('button[type="submit"]').click();
  
      // Assert the success message or redirection
      cy.contains('Thank you for registering').should('be.visible'); // Adjust based on your app's behavior
    });
  });
  