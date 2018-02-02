Cypress.Commands.add('visitApp', route => {
  const clientUrl = Cypress.env('CLIENT_URL').trim()
  const apiUrl = Cypress.env('API_URL').trim()
  const query = `?api-url=${encodeURIComponent(apiUrl)}`
  const fullUrl = [clientUrl, route, query].filter(Boolean).join('/')
  return cy.visit(fullUrl)
})

Cypress.Commands.add('getByTestId', id => {
  return cy.get(`[data-test="${id}"]`)
})
