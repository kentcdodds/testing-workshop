import generateArticleData from '../../other/generate/article'
import {visitApp, sel, loginAsNewUser} from '../utils'

describe('Posts', () => {
  it('should allow you to create new posts', () => {
    loginAsNewUser().then(() => {
      const {title, description, body, tagList} = generateArticleData()
      const shortBody = body.slice(0, 10)
      visitApp('/editor')

      // create the post
      fillInPostDetails({title, description, body: shortBody, tagList})
      cy.get(sel('submit')).click()

      // validate the post
      validatePostDetails({title, body: shortBody, tagList})

      // edit the post
      cy.get(sel('edit')).click()
      const newDetails = {
        title: `${title}_`,
        description: `${description}_`,
        body: `${shortBody}_`,
        // TODO handle changing tags
      }
      fillInPostDetails(newDetails)
      cy.get(sel('submit')).click()

      validatePostDetails(Object.assign({}, newDetails, {tagList}))
    })
  })
})

function fillInPostDetails({title, description, body, tagList = []}) {
  cy
    .get(sel('title'))
    .type(`{selectall}${title}`)
    .get(sel('description'))
    .type(`{selectall}${description}`)
    .get(sel('body'))
    .type(`{selectall}${body}`)
  tagList.forEach(tag => {
    cy.get(sel('tags')).type(`{selectall}${tag}`).type('{enter}')
  })
}

function validatePostDetails({title, body, tagList = []}) {
  cy.get(sel('title')).should('contain.text', title)
  cy.get(sel('body')).should('contain.text', `${body}\n`)
  tagList.forEach((tag, index) => {
    cy
      .get(`${sel('tags')} li:nth-child(${index + 1})`)
      .should('contain.text', tag)
  })
}
