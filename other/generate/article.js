import faker from 'faker'
import _ from 'lodash'

export default generateAuthorData

function generateAuthorData(author, overrides = {}) {
  const {hacker: h} = faker
  const title = `${h.ingverb()} the ${h.adjective()} ${h.noun()} like it's ${h.abbreviation()}` // eslint-disable-line max-len
  return Object.assign(
    {
      title,
      slug: faker.helpers.slugify(title),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      favoritesCount: 0,
      comments: [],
      tagList: _.times(_.random(0, 5), faker.company.bsNoun) || [],
      author,
    },
    overrides,
  )
}
