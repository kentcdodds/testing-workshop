import * as generate from '../shared/generate'

function loginAsNewUser() {
  return createNewUser().then(user => {
    window.localStorage.setItem('jwt', user.token)
    return user
  })
}

function createNewUser() {
  const user = generate.loginForm()

  return cy
    .log('create a test new user')
    .request('POST', `${Cypress.env('API_URL').trim()}/auth/register`, user)
    .then(({body}) => {
      return Object.assign({}, body.user, user)
    })
}

function logout() {
  window.localStorage.removeItem('jwt')
}

export {createNewUser, loginAsNewUser, logout, generate}
