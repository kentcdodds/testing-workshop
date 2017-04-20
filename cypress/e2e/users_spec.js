import {sel, getRandomUserData, createNewUser, loginAsNewUser} from '../utils'

describe('Users', () => {
  // what kinds of things does a user do that we want to make sure
  // doesn't break?
})

function verifyLoggedIn(username) {
  const hash = Cypress.env('E2E_DEV') ? '#/' : ''
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
