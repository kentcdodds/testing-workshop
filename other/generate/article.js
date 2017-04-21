import faker from 'faker'
import _ from 'lodash'

export default generateArticleData
export {generateArticleForClient}

function generateArticleData(author, overrides = {}) {
  const {hacker: h} = faker
  const title = `${h.ingverb()} the ${h.adjective()} ${h.noun()} like it's ${h.abbreviation()}` // eslint-disable-line max-len
  return cleanObject(
    Object.assign(
      {
        title,
        slug: faker.helpers.slugify(title).toLowerCase(),
        description: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        favoritesCount: 0,
        comments: [],
        tagList: _.uniq(_.times(_.random(0, 5), faker.company.bsNoun) || []),
        author,
      },
      overrides,
    ),
  )
}

function generateArticleForClient(overrides = {}) {
  const {
    title,
    description,
    body,
    tagList,
    author: articleAuthor,
  } = generateArticleData(undefined, overrides)
  return cleanObject({
    title,
    description,
    body,
    tagList,
    author: articleAuthor,
  })
}

/**
 * Prevent undefined properties from existing on the object
 * @param {Object} obj the source object
 * @return {Object} the clean object
 */
function cleanObject(obj) {
  return Object.keys(obj).reduce((res, prop) => {
    if (obj[prop] !== undefined) {
      res[prop] = obj[prop]
    }
    return res
  }, {})
}
