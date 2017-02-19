import {visitApp} from '../utils'

describe('Smoke test', () => {
  it('should load and have the right title', () => {
    visitApp()
    cy.title().should('equal', 'Conduit')
  })
})
