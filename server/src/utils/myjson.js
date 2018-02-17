import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.myjson.com',
})

async function createJSON(data) {
  const response = await api.post('/bins', data)
  return response.data
}

export {createJSON}
