import {loginAsNewUser, logout, generate, assertRoute} from '../utils'

describe('authentication', () => {
  beforeEach(() => {
    return logout()
  })

  it('should allow existing users to login', () => {
    const fakePost = generate.postData()
    // shorten the content so we don't have to wait so long
    fakePost.content = fakePost.content.slice(0, 50)
    loginAsNewUser().then(user => {
      cy
        .visitApp()
        .getByTestId('create-post-link')
        .click()
        .getByTestId('title-input')
        .type(fakePost.title)
        .getByTestId('content-input')
        // the delay is because the content takes
        // forever to type otherwise
        .type(fakePost.content, {delay: 1})
        .getByTestId('tags-input')
        .type(fakePost.tags.join(', '))
        .getByTestId('editor-submit')
        .click()
      assertRoute('/')
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
