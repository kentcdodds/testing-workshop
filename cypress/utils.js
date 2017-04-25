import faker from 'faker'
import {generateUserForClient} from '../other/generate/user'

export {visitApp, sel, getRandomUserData, createNewUser, loginAsNewUser}

function getRandomUserData() {
  const password = faker.internet.password()
  const user = generateUserForClient({password})
  return Object.assign(user, {password})
}

function visitApp(route = '/') {
  const hash = Cypress.env('E2E_DEV') ? '/#' : ''
  const clientUrl = Cypress.env('CLIENT_URL')
  const apiUrl = Cypress.env('API_URL')
  const query = `api-url=${encodeURIComponent(apiUrl)}`
  const fullUrl = `${clientUrl}${hash}${route}?${query}`
  return cy.visit(fullUrl)
}

function sel(id) {
  return `[data-test="${id}"]`
}

function createNewUser() {
  const {email, password, username} = getRandomUserData()
  const user = {email, password, username}

  return cy
    .log('create a test new user')
    .request('POST', `${Cypress.env('API_URL')}/users`, {user})
    .then(({body}) => {
      const fullUser = Object.assign({}, body.user, user)
      return {
        user: fullUser,
        cleanup() {
          return cy
            .log('delete the test user')
            .request({
              method: 'DELETE',
              url: `${Cypress.env('API_URL')}/users/${username}`,
              headers: {
                authorization: `Token ${fullUser.token}`,
              },
            })
            .then(logout, logout)
        },
      }
    })
}

function loginAsNewUser() {
  return createNewUser().then(result => {
    window.localStorage.setItem('jwt', result.user.token)
    return result
  })
}

function logout() {
  window.localStorage.removeItem('jwt')
}
