const sel = id => `[data-test="${id}"]`
describe('authentication', () => {
  it('should have the right title', () => {
    const home = `http://localhost:${Cypress.env('CLIENT_PORT')}/`
    cy
      .visit(home)
      .get(sel('register-link'))
      .click()
      .get(sel('username-input'))
      .type('some-user')
      .get(sel('password-input'))
      .type('some-password')
      .get(sel('login-submit'))
      .click()
    cy.url().should('equal', home)
    cy.get(sel('username-display')).should('contain', 'some-user')
  })
})
