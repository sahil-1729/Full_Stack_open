//Conatins the errorhandling and unknown endpoints
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const getToken = (request,response,next) => {
  let authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    authorization = authorization.replace('Bearer ','')
    request.token =  authorization
    // logger.info(request.token)
  }else{
  request.token = null
  }
  next('route')
}

const userExtract = (request,response,next) => {
  const decodedToken = jwt.verify(request.token,process.env.SECRET)
  if(!decodedToken){
    response.status(401).json({error : "invalid token"})
  }
  request.user = decodedToken
  next()
}
const errorHandler = (error,request,response,next) => {
      logger.error(error.message)
      if(error.name === 'CastError'){
        response.status(400).json({ error : 'malformated id'})
      } 
      else if(error.name === 'ValidationError'){
        response.status(400).json({error : error.message})
      }
      else if(error.name === 'JsonWebTokenError'){
        response.status(401).json({error : error.message})
      }
      next(error)
    }
    const unknown = (request,response) => {
      response.status(400).json({ error : `Page not found`})
    }

module.exports = {
    errorHandler,
    unknown,
    getToken,
    userExtract
}