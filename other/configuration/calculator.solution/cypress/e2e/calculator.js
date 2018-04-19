/* globals cy */
describe('calculator', () => {
  it('can visit the app', () => {
    cy
      .visit('/')
      .getByText(/^1$/)
      .click()
      .getByText(/^\+$/)
      .click()
      .getByText(/^2$/)
      .click()
      .getByText(/^=$/)
      .click()
  })
})
