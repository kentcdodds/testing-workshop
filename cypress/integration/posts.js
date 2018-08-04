import {generate} from '../utils'

describe('posts', () => {
  let user
  beforeEach(() => {
    return cy
      .loginAsNewUser()
      .then(u => (user = u))
      .visit('/')
  })

  it('should allow existing users to login', () => {
    const fakePost = generate.postData()
    // shorten the content so we don't have to wait so long
    fakePost.content = fakePost.content.slice(0, 50)
    cy.getByText(/^\+$/)
      .click()
      .getByLabelText(/title/i)
      .type(fakePost.title)
      .getByLabelText(/content/i)
      // the delay is because the content takes
      // forever to type otherwise
      .type(fakePost.content, {delay: 1})
      .getByLabelText(/tags/i)
      .type(fakePost.tags.join(', '))
      .getByText(/submit/i)
      .click()
      .assertRoute('/')
    cy.getByTestId('post-title')
      .first()
      .should('contain', fakePost.title)
    cy.getByTestId('post-content')
      .first()
      .should('contain', fakePost.content)
    fakePost.tags.forEach((t, i) => {
      cy.getByTestId(`post-tag-${i}`)
        .first()
        .should('contain', t)
    })
    cy.getByTestId('post-author-username')
      .first()
      .should('contain', user.username)
  })
})
