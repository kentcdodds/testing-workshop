import {createNewUser, logout, generate, assertRoute} from '../utils'

describe('authentication', () => {
  beforeEach(() => {
    return logout()
  })

  it('should allow users to register', () => {
    const user = generate.loginForm()
    cy
      .visitApp()
      .getByTestId('register-link')
      .click()
      .getByTestId('username-input')
      .type(user.username)
      .getByTestId('password-input')
      .type(user.password)
      .getByTestId('login-submit')
      .click()
    assertRoute('/')
    cy.getByTestId('username-display').should('contain', user.username)
  })

  it('should allow existing users to login', () => {
    createNewUser().then(user => {
      cy
        .visitApp()
        .getByTestId('login-link')
        .click()
        .getByTestId('username-input')
        .type(user.username)
        .getByTestId('password-input')
        .type(user.password)
        .getByTestId('login-submit')
        .click()
      assertRoute('/')
      cy.getByTestId('username-display').should('contain', user.username)
    })
  })
})
