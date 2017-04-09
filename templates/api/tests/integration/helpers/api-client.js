// COMMENT_START
// going to have the attendees create this file themselves
// so wrapping the whole thing in a FINAL directive so it's
// not in the exercise.
// COMMENT_END
// FINAL_START
import axios from 'axios'
import faker from 'faker'
import {generateArticleForClient} from '../../../../other/generate/article'
import generateUserData from '../../../../other/generate/user'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

const user = getUserAPI()
const article = getArticleAPI()

export {api, user, article}

function getUserAPI() {
  return {create, login}

  async function create(overrides) {
    const {email, password, username} = getRandomUserData(overrides)
    const userData = {email, password, username}
    const result = await api.post('users', {user: userData})
    return result.data.user
  }

  async function login(userData) {
    const result = await api.post('users/login', {user: userData})
    return result.data
  }

  function getRandomUserData(overrides) {
    const password = faker.internet.password()
    const userData = generateUserData(Object.assign({password}, overrides))
    return Object.assign(userData, {password})
  }
}

function getArticleAPI() {
  return {create, get, update, delete: del}

  async function create(overrides) {
    const newArticle = generateArticleForClient(overrides)
    const result = await api.post('articles', {article: newArticle})
    return result.data.article
  }

  async function get(articleData) {
    const result = await api.get(`/articles/${articleData.slug}`)
    return result.data.article
  }

  async function update(articleData) {
    const result = await api.put(`articles/${articleData.slug}`, {
      article: articleData,
    })
    return result.data.article
  }

  async function del(articleData) {
    const result = await api.delete(`articles/${articleData.slug}`)
    return result.data
  }
}
// FINAL_END
