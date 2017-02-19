describe('Smoke test', () => {
  it('should load and have the right title', () => {
    visitApp()
    cy.title().should('include', 'Conduit')
  })

  it('should allow a new user to sign up', () => {
    visitApp()
    
  })
})

function visitApp() {
  cy.visit(Cypress.env('APP_URL'))
}
