import axios from 'axios'

let api, isLoggedIn
const envBaseUrl = process.env.REACT_APP_API_URL

const getData = res => res.data

const requests = {
  delete: url => api.delete(url).then(getData),
  get: url => api.get(url).then(getData),
  put: (url, body) => api.put(url, body).then(getData),
  post: (url, body) => api.post(url, body).then(getData),
}

const auth = {
  me() {
    if (!isLoggedIn) {
      return Promise.resolve({user: null})
    }
    return requests.get('/auth/me').catch(error => {
      if (error.response.status === 401) {
        logout()
        return {user: null}
      }
      return Promise.reject(error)
    })
  },
  logout: () => {
    logout()
    return Promise.resolve({user: null})
  },
  login: form =>
    requests.post('/auth/login', form).then(data => {
      login({token: data.user.token})
      return data
    }),
  register: form =>
    requests.post('/auth/register', form).then(data => {
      login({token: data.user.token})
      return data
    }),
}

const users = {
  delete: id => requests.delete(`/users/${id}`),
  get: id => requests.get(id ? `/users/${id}` : '/users'),
  update: (id, updates) => requests.put(`/users/${id}`, updates),
  create: user => requests.post('/users', user),
}

const posts = {
  delete: id => requests.delete(`/posts/${id}`),
  get: id => requests.get(id ? `/posts/${id}` : '/posts'),
  update: (id, updates) => requests.put(`/posts/${id}`, updates),
  create: post => requests.post('/posts', post),
}

function logout() {
  window.localStorage.removeItem('token')
  init({token: null})
}

function login({token}) {
  window.localStorage.setItem('token', token)
  init({token})
}

function init({
  token = window.localStorage.getItem('token'),
  baseURL = (api && api.defaults.baseURL) || envBaseUrl,
  axiosOptions = {headers: {}},
} = {}) {
  isLoggedIn = Boolean(token)
  api = axios.create({
    baseURL,
    ...axiosOptions,
    headers: {
      authorization: token ? `Bearer ${token}` : undefined,
      ...axiosOptions.headers,
    },
  })
}

export {init, users, posts, auth}
