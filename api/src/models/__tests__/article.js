import mongoose from 'mongoose'
import {
  generateUser,
  getArticleConstructor,
  generateArticle,
} from './helpers/utils'

test('can create a new empty article', () => {
  const Article = getArticleConstructor()
  const article = new Article()
  expect(article.toJSON()).toEqual({
    _id: expect.any(mongoose.Types.ObjectId),
    tagList: [],
    comments: [],
    favoritesCount: 0,
  })
})

test('generates a slug when validated', () => {
  const {article} = generateArticle({
    title: 'I tested my codebase, you wont believe what happened next...',
  })
  article.validate()
  expect(article.slug).toBe(
    'i-tested-my-codebase-you-wont-believe-what-happened-next...',
  )
})

test('updates the favorite count via favoriters', async () => {
  const {article, MockUserModel} = generateArticle()
  await article.updateFavoriteCount()
  expect(article.save).toHaveBeenCalledTimes(1)
  expect(MockUserModel.count).toHaveBeenCalledTimes(1)
  expect(MockUserModel.count).toHaveBeenCalledWith({
    favorites: {
      $in: [article._id],
    },
  })
  expect(article.favoritesCount).toBe(MockUserModel._mockData.count)
})

test.skip('can get JSON for a specific user', () => {
  const {article} = generateArticle()
  const {user: loggedInUser} = generateUser()
  // the next line fails because the article.author is not populated
  // find out how to simulate populate...
  const result = article.toJSONFor(loggedInUser)
  expect(result).toMatchSnapshot()
  expect(result.favorited).toBe(false)
})
