import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'
const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      important: true
    }
    const data = request.then((response) => {
        return response.data.concat(nonExisting)
    })
    return data
  }
const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    const data = request.then((response => response.data))
    return data
}
const update = (id,newObject) => {
    const request = axios.put(`${baseUrl}/${id}`,newObject)

    return request.then(response => response.data)
}

export default {getAll, create, update}
// export default {
//     key : variable format me hai
//     getAll: getAll,
//     create: create,
//     update: update
// }
