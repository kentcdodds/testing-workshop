import {createNewUser} from '../utils'

Cypress.addParentCommand('loginAsNewUser', () => {
  createNewUser().then(user => {
    cy.window().then(win => {
      win.localStorage.setItem('jwt', user.token)
    })
  })
})
