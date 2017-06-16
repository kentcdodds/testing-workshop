import {sel} from '../utils'
describe('Users', () => {
  // what kinds of things does a user do that we want to make sure
  // doesn't break?
})

// I'll just give you this function :)
// eslint-disable-next-line no-unused-vars
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
