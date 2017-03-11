import generateArticleData from '../../other/generate/article'
import {visitApp, sel, loginAsNewUser} from '../utils'

describe('Posts', () => {
  it('should allow you to create new posts', () => {
    loginAsNewUser().then(() => {
      const {title, description, body, tagList} = generateArticleData()
      const shortBody = body.slice(0, 10)
      visitApp('/editor')
      cy
        .get(sel('title'))
        .type(title)
        .get(sel('description'))
        .type(description)
        .get(sel('body'))
        .type(shortBody) // shorter so we don't have to wait so long

      tagList.forEach(tag => {
        cy.get(sel('tags')).type(tag).type('{enter}')
      })

      cy.get(sel('submit')).click()
    })
  })
})
