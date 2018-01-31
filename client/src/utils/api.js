import axios from 'axios'
import queryString from 'query-string'
import {it} from 'param.macro'

const api = axios.create({
  baseURL:
    queryString.parse(window.location.search)['api-url'] ||
    process.env.REACT_APP_API_URL,
})

const getData = it.data

const requests = {
  delete: url => api.delete(url).then(getData),
  get: url => api.get(url).then(getData),
  put: (url, body) => api.put(url, body).then(getData),
  post: (url, body) => api.post(url, body).then(getData),
}

const auth = {
  me() {
    if (!api.defaults.headers.common.authorization) {
      return Promise.resolve({user: null})
    }
    return requests.get('/auth/me').catch(error => {
      if (error.response.status === 401) {
        window.localStorage.removeItem('jwt')
        setToken(null)
        return {user: null}
      }
      return Promise.reject(error)
    })
  },
  logout: () => {
    setToken(null)
    return Promise.resolve({user: null})
  },
  login: form =>
    requests.post('/auth/login', form).then(data => {
      window.localStorage.setItem('jwt', data.user.token)
      setToken(data.user.token)
      return data
    }),
  register: form =>
    requests.post('/auth/register', form).then(data => {
      window.localStorage.setItem('jwt', data.user.token)
      setToken(data.user.token)
      return data
    }),
}

const users = {
  delete: id => requests.delete(`/users/${id}`),
  get: id => requests.get(id ? `/users/${id}` : '/users'),
  update: (id, updates) => requests.put(`/users/${updates.id}`, updates),
  create: user => requests.post('/users', user),
}

const posts = {
  delete: id => requests.delete(`/posts/${id}`),
  get: id => requests.get(id ? `/posts/${id}` : '/posts'),
  update: (id, updates) => requests.put(`/posts/${updates.id}`, updates),
  create: post => requests.post('/posts', post),
}

function setToken(token) {
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common.authorization
  }
}

function init() {
  setToken(window.localStorage.getItem('jwt'))
}

export {init, users, posts, auth, setToken}
