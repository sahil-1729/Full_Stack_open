const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const { userExtract } = require('../utils/middleware')

blogRouter.get('/', async (request, response,next) => {
  const blog = await Blog.find({}).populate('user')  
  response.status(200).json(blog)
  // Blog
  //     .find({})
  //     .then(blogs => {
  //       response.json(blogs)
  //     })
  })

blogRouter.get('/:id', async (request, response,next) => {
  
  //eliminating try catch by using express-async-error packages
  // try{
    const blogs = await Blog.findById(request.params.id)
    response.json(blogs)
  // }catch(exception){
  //   next(exception)
  // }

  // Blog
  //     .findById(request.params.id)
  //     .then(blogs => {
  //       response.json(blogs)
  //     })
  //   .catch(error=>next(error))
  })
  
blogRouter.delete('/:id', userExtract ,async (request, response,next) => {
  
  // const decodedToken = jwt.verify(request.token,process.env.SECRET)
  // if(!decodedToken){
  //   response.status(401).json({error : "invalid token"})
  // }

  const blogObj = await Blog.findById(request.params.id)
  logger.info(`obj from token `,request.user,` obj from blog`,blogObj)
  const useridFromBlogObj = blogObj.user.toString()
  console.log('decoded token id', request.user.id)
  if(request.user.id !== useridFromBlogObj){
    response.status(401).json({error : "invalid user"})
  }else{
  // response.status(200).json({oops : "work in progress"})
  const result = await Blog.findByIdAndDelete(request.params.id)
  if(result){
    // logger.info(`delete success`, result)
    response.status(204).end()
  }else{
    response.status(400).json({error : "The blog does not exist"})
  }
  }
})

blogRouter.put('/:id',async (request,response,next) => {
  const body = request.body
  logger.info(body)
  const decoy = {
      title : body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      id: body.id
  }
  
  const result = await Blog.findByIdAndUpdate(request.params.id,decoy,{ new : true })
  response.status(200).json(result)

})

blogRouter.post('/', userExtract,async (request, response, next) => {

    const {title,author,url,likes,userId} = request.body
    // const uID = userId

    // const decodedToken = jwt.verify(request.token,process.env.SECRET)
    // if(!decodedToken){
    //   response.status(401).json({error : "invalid token"})
    // }

    //it contains the object having id and username, which are specified in login.js
    logger.info(`Decoded Token `,request.user)
    const userObj = await User.findById(request.user.id)
    // info(`The object ${userObj}`)
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user : userObj.id
    })
    
    logger.info(`Here's the result`,blog, typeof blog)
    if(blog.title === undefined){
      response.status(400).json({error : 'empty data'})
    }
    else{    
      try{
        // if(!blog.likes){
        //   blog.likes = 0
        // }
        const savedBlog = await blog.save()
        logger.info(savedBlog.id)
        //modified the properties of model
        userObj.blogs = userObj.blogs.concat(savedBlog.id)
        //since modified, it has to be saved
        await userObj.save()
        // const result = await blog.save()
        response.status(201).json(savedBlog)
      }catch(exception){
        next(exception)
      }
      
    //   blog
    // .save()
    // .then(result => {
    //   response.status(201).json(result)
    // })
    // .catch(error=>next(error))
    }
  })

  module.exports = blogRouter