import axios from 'axios'
const login = '/api/login'
const getLogin =  async (details) => {
  const token = await axios.post(login,details)
  return token.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getLogin }