import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = async (key) => {
  token = `Bearer ${key}`
}
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const removeBlog = async (id) => {
  
  try{
  const config = {
    headers : { Authorization : token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response
  }catch(error){
    console.log(`Error `,error.response.data)
    const message = error.response.data
    if(message.error === "jwt expired"){
      console.log(`worked`)
      window.localStorage.clear()
      window.location.reload()
    }
  }
}
const put = async(id,modifiedObj) => {
  const response = await axios.put(`${baseUrl}/${id}`,modifiedObj)
  return response.data
}
const create = async (toBeSaved) => {
  
  try{
  const config = {
    headers : { Authorization : token }
  }
  const response = await axios.post(baseUrl,toBeSaved,config)
  return response.data
  }catch(error){
    console.log(`Error `,error.response.data)
    const message = error.response.data

    if(message.error === "jwt expired"){
      console.log(`worked`)
      window.localStorage.clear()
      window.location.reload()
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, put, removeBlog }