import axios from 'axios'

async function createJSON(data) {
  const response = await axios.post('https://api.myjson.com/bins', data)
  return response.data
}

export {createJSON}
