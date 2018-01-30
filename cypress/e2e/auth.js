import {createNewUser, logout} from '../utils'

describe('authentication', () => {
  beforeEach(() => {
    return logout()
  })

  it('should allow users to register', () => {
    const user = {
      username: `temp-${new Date().getTime()}`,
      password: 'some-password',
    }
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
    cy.url().should('equal', `${Cypress.env('CLIENT_URL')}/`)
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
      cy.url().should('equal', `${Cypress.env('CLIENT_URL')}/`)
      cy.getByTestId('username-display').should('contain', user.username)
    })
  })
})
