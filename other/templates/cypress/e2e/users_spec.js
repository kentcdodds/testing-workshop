// COMMENT_START
/*
// COMMENT_END
// WORKSHOP_START
import {sel} from '../utils'
// WORKSHOP_END
// COMMENT_START
*/
// COMMENT_END
// FINAL_START
import {sel, getRandomUserData, createNewUser, loginAsNewUser} from '../utils'

// FINAL_END
describe('Users', () => {
  // WORKSHOP_START
  // what kinds of things does a user do that we want to make sure
  // doesn't break?
  // WORKSHOP_END
  // FINAL_START
  it('should allow a new user to sign up and log out', () => {
    const {username, email, password} = getRandomUserData()
    cy
      .visitApp()
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
    cy.window().its('localStorage').invoke('getItem', 'jwt').should('be.null')
    cy.get(sel('profile-link')).should('not.exist')
  })

  it('should allow an existing user to login', () => {
    createNewUser().then(({user: {email, username, password}}) => {
      cy
        .visitApp()
        .get(sel('sign-in-link'))
        .click()
        .get(sel('email'))
        .type(email)
        .get(sel('password'))
        .type(password)
        .get('form')
        .submit()
      verifyLoggedIn(username)
    })
  })

  it('should allow an existing user to update their settings', () => {
    loginAsNewUser().then(({user}) => {
      // route needs to be set properly
      const newUsername = `${user.username}55`
      const photoUrl = 'https://randomuser.me/api/portraits/lego/7.jpg'
      const newBio = 'a new bio'
      const newEmail = `${user.username}_55@example.com`
      cy
        .server()
        .route('PUT', `${Cypress.env('API_URL')}/user`)
        .as('putUser')
        .visitApp('/settings')
        .get(sel('profile-url'))
        .type(photoUrl)
        .get(sel('username'))
        .clear()
        .type(newUsername)
        .get(sel('bio'))
        .type(newBio)
        .get(sel('email'))
        .clear()
        .type(newEmail)
        .get(sel('password'))
        .type('5uper-5ecure')
        .get('form')
        .submit()

      cy.wait('@putUser').visitApp('/settings')

      cy.get(sel('profile-url')).should('have.value', photoUrl)
      cy.get(sel('username')).should('have.value', newUsername)
      cy.get(sel('bio')).should('have.value', newBio)
      cy.get(sel('email')).should('have.value', newEmail)
    })
  })
  // FINAL_END
})

// WORKSHOP_START
// I'll just give you this function :)
// eslint-disable-next-line no-unused-vars
// WORKSHOP_END
function verifyLoggedIn(username) {
  const hash = Cypress.env('E2E_DEV') ? '#/' : '/'
  cy
    .window()
    .its('localStorage')
    .invoke('getItem', 'jwt')
    .should('not.be.null')
  return cy
    .get(sel('profile-link'))
    .should('contain.text', username)
    .and('have.attr', 'href', `${hash}@${username}`)
}
