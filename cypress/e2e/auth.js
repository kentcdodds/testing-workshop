const sel = id => `[data-test="${id}"]`
describe('authentication', () => {
  it('should have the right title', () => {
    cy
      .visit('http://localhost:3000')
      .get(sel('register-link'))
      .click()
      .get(sel('username-input'))
      .type('some-user')
      .get(sel('password-input'))
      .type('some-password')
      .get(sel('login-submit'))
      .click()
    cy.url().should('equal', 'http://localhost:3000/')
    cy.get(sel('username-display')).should('contain', 'some-user')
  })
})
