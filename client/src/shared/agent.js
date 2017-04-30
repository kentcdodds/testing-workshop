import axios from 'axios'
import queryString from 'query-string'

const api = axios.create({
  baseURL: getAPIUrl(),
})

const encode = encodeURIComponent
const responseData = res => res.data

const requests = {
  delete: url => api.delete(url).then(responseData),
  get: url => api.get(url).then(responseData),
  put: (url, body) => api.put(url, body).then(responseData),
  post: (url, body) => api.post(url, body).then(responseData),
}

const Auth = {
  current: () =>
    requests.get('/user').catch(error => {
      if (error.response.status === 401) {
        window.localStorage.removeItem('jwt')
        setToken(null)
        window.location.assign('/')
        return
      }
      return Promise.reject(error)
    }),
  login: (email, password) =>
    requests.post('/users/login', {user: {email, password}}),
  register: (username, email, password) =>
    requests.post('/users', {user: {username, email, password}}),
  save: user => requests.put('/user', {user}),
}

const Tags = {
  getAll: () => requests.get('/tags'),
}

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`
const omitSlug = article => Object.assign({}, article, {slug: undefined})
const Articles = {
  all: page => requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  delete: slug => requests.delete(`/articles/${slug}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get('/articles/feed?limit=10&offset=0'),
  get: slug => requests.get(`/articles/${slug}`),
  unfavorite: slug => requests.delete(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, {article: omitSlug(article)}),
  create: article => requests.post('/articles', {article}),
}

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, {comment}),
  delete: (slug, commentId) =>
    requests.delete(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug => requests.get(`/articles/${slug}/comments`),
}

const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.delete(`/profiles/${username}/follow`),
}

export default {
  Articles,
  Auth,
  Comments,
  Profile,
  Tags,
  setToken,
}

function setToken(token) {
  if (token) {
    api.defaults.headers.common.authorization = `Token ${token}`
  } else {
    delete api.defaults.headers.common.authorization
  }
}

function getAPIUrl() {
  const productionUrl = 'https://conduit.productionready.io/api'
  const developmentUrl = 'http://localhost:3000/api'
  const isProduction = process.env.NODE_ENV === 'production'
  if (isProduction) {
    return queryString.parse(location.search)['api-url'] || productionUrl
  } else {
    const search = location.hash.slice(location.hash.indexOf('?'))
    return queryString.parse(search)['api-url'] || developmentUrl
  }
}
