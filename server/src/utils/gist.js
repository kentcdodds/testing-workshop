import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.github.com/gists',
})

async function createGist(data) {
  const response = await api.post('/', data)
  return response.data
}

export {createGist}
