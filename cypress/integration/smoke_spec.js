describe('Smoke test', () => {
  it('load and have the right title', () => {
    cy.visit(Cypress.env('APP_URL'))
    cy.title().should('include', 'Conduit')
  })
})
