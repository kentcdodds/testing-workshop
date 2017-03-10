import faker from 'faker'

export {visitApp, sel, getRandomUserData, createNewUser, loginAsNewUser}

function getRandomUserData() {
  const {
    username: cardUsername,
    email: cardEmail,
    avatar: image,
  } = faker.helpers.contextualCard()

  const username = cardUsername.toLowerCase().replace(/[ |.|_|-]/g, '')
  const email = cardEmail.toLowerCase()
  const password = faker.internet.password()
  const bio = faker.hacker.phrase()
  return {username, password, bio, email, image}
}

function visitApp(route = '/') {
  const clientUrl = Cypress.env('CLIENT_URL')
  const apiUrl = Cypress.env('API_URL')
  const fullUrl = `${clientUrl}/#${route}?api-url=${encodeURIComponent(apiUrl)}`
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
