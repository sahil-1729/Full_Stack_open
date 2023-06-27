const jsonwebtoken = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {info} = require('../utils/logger')
loginRouter.post('/', async (request,response,next) => {
    const {username, password} = request.body
    const obj = await User.findOne({username})
    // info(obj)
    // info(`the password ${password} and Hashedpass ${obj.passwordHash}`)
    const flag = obj === null ? false : await bcrypt.compare(password,obj.passwordHash)

    if(!(obj && flag)){
        response.status(401).json({error : "invalid username or password"})
    }
    const tokenObj = {
        username : obj.username,
        id : obj._id
    }
    const token = jsonwebtoken.sign(tokenObj,process.env.SECRET
        ,{expiresIn:60*60}
        )
    response.status(200).json({ token,username : tokenObj.username,id : tokenObj.id })
})
module.exports = loginRouter