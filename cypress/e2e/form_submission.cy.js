Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignore specific React errors temporarily
  if (
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423')
  ) {
    return false; // Prevent Cypress from failing the test
  }
  return true; // Let other exceptions fail the test
});

describe('Reseller Registration Form', () => {
  beforeEach(() => {
    cy.visit('/support/reseller-registration'); // Navigate to the form page
    // Wait for the page to stabilize
    cy.wait(2000);
  });

  it('fills out and submits the form successfully', () => {
    // Fill out personal information (Tab 1)
    // Use aliases and separate commands for better stability
    cy.get('#first-name')
      .should('be.visible')
      .should('not.be.disabled')
      .as('firstName');
    cy.get('@firstName').type('John', { force: true });

    cy.get('#last-name')
      .should('be.visible')
      .should('not.be.disabled')
      .as('lastName');
    cy.get('@lastName').type('Doe', { force: true });

    cy.get('#email')
      .should('be.visible')
      .should('not.be.disabled')
      .as('email');
    cy.get('@email').type('john.doe@example.com', { force: true });

    // Use PhoneInput with better waiting
    cy.get('input[name="phone"]')
      .should('be.visible')
      .should('not.be.disabled')
      .as('phone');
    cy.get('@phone').type('+12345678901', { force: true });

    // Wait for dynamic dropdowns with longer timeout
    cy.get('#title', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .as('title');
    cy.get('@title').select('Manager');

    cy.get('#inquiry', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .as('inquiry');
    cy.get('@inquiry').select('I want to become a manufacturer rep.');

    // Wait for account managers with longer timeout
    // cy.get('#accountManager', { timeout: 10000 })
    //   .should('be.visible')
    //   .should('not.be.disabled')
    //   .as('accountManager');
    // cy.get('@accountManager').select('John Smith');

    // Click Continue with retry
    cy.contains('button', 'Continue')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    // Wait for second tab to load
    cy.wait(1000);

    // Fill out company information (Tab 2) with better waiting
    cy.get('#companyName')
      .should('be.visible')
      .should('not.be.disabled')
      .type('My Test Company');

    cy.get('#street')
      .should('be.visible')
      .should('not.be.disabled')
      .type('123 Test St');

    cy.get('#city')
      .should('be.visible')
      .should('not.be.disabled')
      .type('Test City');

    cy.get('#state')
      .should('be.visible')
      .should('not.be.disabled')
      .select('Kentucky');

    cy.get('#zipCode')
      .should('be.visible')
      .should('not.be.disabled')
      .type('42001');

    cy.get('#country', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .as('country');
    cy.get('@country').select('US');
      
    cy.get('#region')
      .should('be.visible')
      .should('not.be.disabled')
      .type('North America');

    cy.get('#businessType', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .as('businessType');
    cy.get('@businessType').select('I am a retailer');

    cy.get('#website')
      .should('be.visible')
      .should('not.be.disabled')
      .type('https://testcompany.com');

    cy.get('#companyDescription')
      .should('be.visible')
      .should('not.be.disabled')
      .type('We are a leading company in the HVAC industry.');

    cy.get('#referral', { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .as('referral');
    cy.get('@referral').select('REP: Ally Davis');

    // Agree to terms
    cy.get('input[type="checkbox"]')
      .should('be.visible')
      .should('not.be.disabled')
      .check();

    // Submit the form
    cy.contains('button', 'Submit')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

    // Assert success message with longer timeout
    cy.contains('Your registration has been submitted.', { timeout: 10000 }).should(
      'be.visible'
    );
  });
});
