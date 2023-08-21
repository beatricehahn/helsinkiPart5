import axios from 'axios'
const baseUrl = '/api/blogs'

// private token variable
let TOKEN = null

// changes token value with auth header
const setToken = newToken => {
  TOKEN = `Bearer ${newToken}`
}

const getAll = () => {
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

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${ baseUrl }/${id}`)
  // return request.status(202)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken, remove }