//store the url and ports from the environmental variables

require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST : process.env.MONGODB_URI
const PORT = process.env.PORT

module.exports = {
    MONGODB_URI,
    PORT
}
