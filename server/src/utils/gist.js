import axios from 'axios'

async function createGist(data) {
  const response = await axios.post('https://api.github.com/gists', data)
  return response.data
}

export {createGist}
