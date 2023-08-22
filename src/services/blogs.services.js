import axios from 'axios'
const baseUrl = '/api/blogs'

// private token variable
let TOKEN = null

// changes token value with auth header
const setToken = newToken => {
  TOKEN = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: TOKEN }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: TOKEN }
  }

  const request = axios.put(`${ baseUrl }/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  const config = {
    headers: { Authorization: TOKEN }
  }

  axios.delete(`${ baseUrl }/${id}`, config)
  // return request.status(202)
}

export default { getAll, create, update, setToken, remove }