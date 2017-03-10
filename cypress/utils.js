import faker from 'faker'

export {visitApp, sel, getRandomUserData, createNewUser}

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
  const fullUrl = Cypress.env('CLIENT_URL') + route
  console.log('***************************', fullUrl)
  // TODO: fix this
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
    .then(resp => Object.assign({}, resp, user))
}
