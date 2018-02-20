// Normally you shouldn't need to break your tests up this much.
// Normally I'd just have a file called `auth` and have all my tests
// in that file. But I've split them up like this to make the workshop
// flow nicer with the demo and exercises.
import {generate, assertRoute} from '../utils'

describe('authentication', () => {
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
})
