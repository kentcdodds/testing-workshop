// Normally you shouldn't need to break your tests up this much.
// Normally I'd just have a file called `auth` and have all my tests
// in that file. But I've split them up like this to make the workshop
// flow nicer with the demo and exercises.
import {generate} from '../utils'

describe('authentication', () => {
  beforeEach(() => {
    return cy.logout().visit('/')
  })
  it('should allow users to register', () => {
    const user = generate.loginForm()
    cy.getByText(/register/i)
      .click()
      .getByLabelText(/username/i)
      .type(user.username)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByText(/submit/i)
      .click()
      .assertRoute('/')
    cy.getByTestId('username-display').should('contain', user.username)
  })
})
