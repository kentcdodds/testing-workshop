import faker from 'faker'
import generateUserData from '../other/generate/user'

export {visitApp, sel, getRandomUserData, createNewUser, loginAsNewUser}

function getRandomUserData() {
  const password = faker.internet.password()
  const user = generateUserData({password})
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
  return `[data-e2e="${id}"]`
}

function createNewUser() {
  const {email, password, username} = getRandomUserData()
  const user = {email, password, username}

  return cy
    .log('create new user')
    .request('POST', `${Cypress.env('API_URL')}/users`, {user})
    .then(({body}) => Object.assign({}, body.user, user))
}

function loginAsNewUser() {
  return createNewUser().then(user => {
    window.localStorage.setItem('jwt', user.token)
    return user
  })
}
