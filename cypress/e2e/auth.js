const sel = id => `[data-test="${id}"]`
describe('authentication', () => {
  it('should have the right title', () => {
    const clientUrl = Cypress.env('CLIENT_URL')
    const apiUrl = Cypress.env('API_URL')
    const query = `api-url=${encodeURIComponent(apiUrl)}`
    const fullUrl = `${clientUrl}/?${query}`
    const home = fullUrl
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
    cy.url().should('equal', `${clientUrl}/`)
    cy.get(sel('username-display')).should('contain', 'some-user')
  })
})
