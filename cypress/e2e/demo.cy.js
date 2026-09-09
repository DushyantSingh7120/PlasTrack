describe('PlastiTrack Demo', () => {
  it('records a smooth product demo', () => {
    // Navigate to landing page
    cy.visit('/');
    
    // Wait to show the beautiful landing page
    cy.wait(4000);
    
    // Click Get Started
    cy.contains('Start Tracking Free', { matchCase: false }).click();
    
    // Dashboard: Wait for animation
    cy.wait(4000);
    
    // Navigate to Tracker
    cy.get('a[href="/tracker"]').first().click();
    
    // Tracker Page: Add a 500ml water bottle
    cy.wait(2000);
    cy.contains('500ml Water Bottle')
      .parent()
      .parent()
      .parent()
      .find('button')
      .contains('+')
      .click();
    
    cy.wait(1000);
    cy.contains("Save Today's Log").click();
    cy.wait(2000);
    
    // Navigate to Insights
    cy.get('a[href="/insights"]').first().click();
    
    // Insights Page: Let charts render
    cy.wait(4000);
    
    // Navigate to Alternatives
    cy.get('a[href="/alternatives"]').first().click();
    cy.wait(4000);
    cy.wait(2000);
  });
});
