import faker from 'faker'
import _ from 'lodash'
import slugify from 'slugify'

export default generateArticleData
export {generateArticleForClient}

function generateArticleData(author, overrides = {}) {
  const baseArticle = generateArticleForClient(overrides)
  return cleanObject(
    Object.assign({author, comments: []}, baseArticle, overrides),
  )
}

function generateArticleForClient(overrides = {}) {
  const {hacker: h} = faker
  const title = `${h.ingverb()} the ${h.adjective()} ${h.noun()} like it's ${h.abbreviation()}` // eslint-disable-line max-len
  return Object.assign(
    {
      title,
      slug: slugify(title).toLowerCase(),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      favoritesCount: 0,
      tagList: _.uniq(_.times(_.random(0, 5), faker.company.bsNoun) || []),
    },
    overrides,
  )
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
