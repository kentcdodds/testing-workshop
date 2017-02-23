import faker from 'faker'
import _ from 'lodash'
import mongoose from 'mongoose'
import getArticleSchema from '../../src/models/article'
import {commonProps} from './utils'

const Article = mongoose.model('Article', getArticleSchema())

export default createArticle

function createArticle(author) {
  const {hacker: h} = faker
  const title = `${h.ingverb()} the ${h.adjective()} ${h.noun()} like it's ${h.abbreviation()}` // eslint-disable-line max-len
  return Object.assign(
    new Article({
      ...commonProps(author.createdAt),
      title,
      slug: faker.helpers.slugify(title),
      description: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(),
      favoritesCount: 0,
      comments: [],
      tagList: _.times(_.random(0, 5), faker.company.bsNoun) || [],
      author: author._id,
    }),
    {_id: faker.random.uuid()},
  )
}
