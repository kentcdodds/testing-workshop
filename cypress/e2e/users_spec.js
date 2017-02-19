import {visitApp, sel, getRandomUserData, createNewUser} from '../utils'

describe('Users', () => {
  it('should allow a new user to sign up and log out', () => {
    const {username, email, password} = getRandomUserData()
    visitApp()
      .get(sel('sign-up-link'))
      .click()
      .get(`form ${sel('username')}`)
      .type(username)
      .get(`form ${sel('email')}`)
      .type(email)
      .get(`form ${sel('password')}`)
      .type(password)
      .get('form')
      .submit()

    verifyLoggedIn(username)

    cy.get(sel('settings')).click().get(sel('logout')).click()
    cy.window().its('localStorage').invoke('getItem', 'jwt').should('be.empty')
    cy.get(sel('profile-link')).should('not.exist')
  })

  it.skip('should allow an existing user to login', () => {
    createNewUser().then(({username, password}) => {
      visitApp()
        .get(sel('sign-in-link'))
        .click()
        .get(`form ${sel('username')}`)
        .type(username)
        .get(`form ${sel('password')}`)
        .type(password)
        .get('form')
        .submit()
      verifyLoggedIn(username)
    })
  })
})

function verifyLoggedIn(username) {
  cy.window().its('localStorage').invoke('getItem', 'jwt').should('exist')
  return cy
    .get(sel('profile-link'))
    .should('contain.text', username)
    .and('have.attr', 'href', `@${username}`)
}
