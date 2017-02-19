import faker from 'faker'

export {visitApp, sel, getRandomUserData, createNewUser}

function getRandomUserData() {
  const {
    username: cardUsername,
    email,
    avatar: image,
  } = faker.helpers.contextualCard()

  const username = cardUsername.toLowerCase().replace(/[ |.|_|-]/g, '')
  const password = faker.internet.password()
  const bio = faker.hacker.phrase()
  return {username, password, bio, email, image}
}

function visitApp() {
  return cy.visit(Cypress.env('CLIENT_URL'))
}

function sel(id) {
  return `[data-e2e="${id}"]`
}

function createNewUser() {
  const {email, password, username} = getRandomUserData()
  const user = {email, password, username}

  return new Promise((resolve, reject) => {
    cy.request('POST', `${Cypress.env('API_URL')}/users`, {user}).then(
      resp => {
        Cypress.Log
          .command({
            name: 'create new user',
            message: JSON.stringify(user),
            consoleProps: function() {
              return user
            },
          })
          .snapshot()
          .end()
        resolve(Object.assign({}, user, resp))
      },
      error => {
        Cypress.Log
          .command({
            name: 'ERROR: create new user',
            message: JSON.stringify(user),
            consoleProps: function() {
              return {error, user}
            },
          })
          .snapshot()
          .end()
        reject(error)
      },
    )
  })
}
