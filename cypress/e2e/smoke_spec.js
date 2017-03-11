describe('Smoke test', () => {
  it('should load and have the right title', () => {
    cy.visitApp().title().should('equal', 'Conduit')
  })
})
