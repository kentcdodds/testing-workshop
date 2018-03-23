import {generate} from '../utils'
import * as queries from './queries'

Cypress.Commands.add('getByTestId', id => {
  return cy.get(`[data-testid="${id}"]`)
})

Cypress.Commands.add('getByLabelText', (...args) => {
  return cy
    .window()
    .then(({document}) =>
      getComandWaiter(document, () =>
        queries.queryByLabelText(document, ...args),
      )(),
    )
})

Cypress.Commands.add('getByText', (...args) => {
  return cy
    .window()
    .then(({document}) =>
      getComandWaiter(document, () => queries.queryByText(document, ...args))(),
    )
})

function getComandWaiter(container, fn) {
  return function waiter() {
    const val = fn()
    if (val) {
      return val
    } else {
      return new Promise(resolve => {
        const observer = new MutationObserver(() => {
          observer.disconnect()
          resolve(waiter())
        })
        observer.observe(container, {subtree: true, childList: true})
      })
    }
  }
}

Cypress.Commands.add('logout', () => {
  return cy
    .window()
    .its('localStorage')
    .invoke('removeItem', 'token')
})

Cypress.Commands.add('createNewUser', () => {
  const user = generate.loginForm()

  return cy
    .log('create a test new user', user)
    .request('POST', `${Cypress.env('API_URL').trim()}/auth/register`, user)
    .then(({body}) => {
      return Object.assign({}, body.user, user)
    })
})

Cypress.Commands.add('loginAsNewUser', () => {
  return cy.createNewUser().then(user => {
    window.localStorage.setItem('token', user.token)
    return user
  })
})

Cypress.Commands.add('assertRoute', route => {
  cy.url().should('equal', `${window.location.origin}${route}`)
})
