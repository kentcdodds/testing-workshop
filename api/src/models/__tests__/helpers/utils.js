import mongoose from 'mongoose'
import _ from 'lodash'
import getArticleSchema from '../../article'
import getUserSchema from '../../user'
import generateUserData from '../../../../../other/generate/user'
import generateArticleData from '../../../../../other/generate/article'

export {
  generateUser,
  getUserConstructor,
  generateArticle,
  getArticleConstructor,
}

function generateUser(overrides) {
  const User = getUserConstructor()
  const user = new User()
  const mockOverrides = {
    save: jest.fn(),
  }
  Object.assign(user, generateUserData(overrides), mockOverrides)
  return user
}

function getUserConstructor() {
  return mongoose.model(_.uniqueId('User'), getUserSchema())
}

function generateArticle(overrides) {
  const MockUserModel = {
    count: jest.fn(() => Promise.resolve(MockUserModel._mockData.count)),
    _mockData: {
      count: 11,
    },
  }
  const Article = getArticleConstructor(MockUserModel)
  const {user: author} = generateUser()
  const article = new Article()
  const mockOverrides = {
    save: jest.fn(),
  }
  Object.assign(article, generateArticleData(author, overrides), mockOverrides)
  return {article, MockUserModel}
}

function getArticleConstructor(MockUserModel) {
  return mongoose.model(_.uniqueId('Article'), getArticleSchema(MockUserModel))
}
