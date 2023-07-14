const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {info} = require('../utils/logger')
userRouter.get('/', async (request, response, next) => {
    const result = await User.find({}).populate('blogs')
    info(`Here's the result`,result, typeof result)
    response.status(200).json(result)
  })

userRouter.post('/', async (request, response, next) => {
    const {username,name,password} = request.body
    const saltRounds = 10 
    info(password)
    if(!password){
        response.status(400).json({error : 'password is required'})
    }
    else
     if(password.length<3){
        response.status(400).json({ error : `password length must be atleast 3, got ${password.length}`})
    }

    const passwordHash = await bcrypt.hash(password,saltRounds)
    const newUser = new User({
        username,
        name,
        passwordHash
    })
    const savedUser = await newUser.save()
    info(`Here's the result`,savedUser, typeof savedUser)
    response.status(200).json(savedUser)
  })

  module.exports = userRouter