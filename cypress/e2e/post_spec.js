import generateArticleData from '../../other/generate/article'
import {visitApp, sel, loginAsNewUser} from '../utils'

describe('Posts', () => {
  let cleanupUser
  before(() => {
    return loginAsNewUser().then(({cleanup}) => {
      cleanupUser = cleanup
    })
  })

  after(() => {
    return cleanupUser()
  })

  it('should allow you to create new posts', () => {
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

function fillInPostDetails({title, description, body, tagList = []}) {
  cy.get(sel('title')).clear().type(title)
  cy.get(sel('description')).clear().type(description)
  cy.get(sel('body')).clear().type(body)

  tagList.forEach(tag => {
    cy.get(sel('tags')).type(tag).type('{enter}')
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
