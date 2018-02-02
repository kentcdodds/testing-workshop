import {loginAsNewUser, logout} from '../utils'

describe('authentication', () => {
  beforeEach(() => {
    return logout()
  })

  it('should allow existing users to login', () => {
    const now = new Date().toISOString()
    const fakePost = {
      title: `Make a sandwich ${now}`,
      content: `Bread, jam, peanut butter ${now}`,
      tags: ['b', 'j', 'pb', now],
    }
    loginAsNewUser().then(user => {
      cy
        .visitApp()
        .getByTestId('create-post-link')
        .click()
        .getByTestId('title-input')
        .type(fakePost.title)
        .getByTestId('content-input')
        .type(fakePost.content)
        .getByTestId('tags-input')
        .type(fakePost.tags.join(', '))
        .getByTestId('editor-submit')
        .click()
      cy.url().should('equal', `${Cypress.env('CLIENT_URL')}/`)
      cy
        .getByTestId('post-title')
        .first()
        .should('contain', fakePost.title)
      cy
        .getByTestId('post-content')
        .first()
        .should('contain', fakePost.content)
      fakePost.tags.forEach((t, i) => {
        cy
          .getByTestId(`post-tag-${i}`)
          .first()
          .should('contain', t)
      })
      cy
        .getByTestId('post-author-username')
        .first()
        .should('contain', user.username)
    })
  })
})
