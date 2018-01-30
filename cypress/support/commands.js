Cypress.Commands.add('visitApp', route => {
  const clientUrl = Cypress.env('CLIENT_URL')
  const apiUrl = Cypress.env('API_URL')
  const query = `?api-url=${encodeURIComponent(apiUrl)}`
  const fullUrl = [clientUrl, route, query].filter(Boolean).join('/')
  return cy.visit(fullUrl)
})

Cypress.Commands.add('getByTestId', id => {
  return cy.get(`[data-test="${id}"]`)
})
