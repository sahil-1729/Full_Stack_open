//create the schema of the database
const { transform } = require('lodash')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user : 
    // String
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
    }
  })

  blogSchema.set('toJSON',{
    // virtuals : true,
    transform: (document,returnedObj) => {
    returnedObj._id = returnedObj._id.toString()
    //create a new property and assign the id to it
    
    if(!returnedObj.likes){
      returnedObj.likes = 0;
    }
    returnedObj.id = returnedObj._id
    
    delete returnedObj._id
    delete returnedObj.__v
    // return returnedObj
    }
  })
  module.exports = mongoose.model('Blog',blogSchema)