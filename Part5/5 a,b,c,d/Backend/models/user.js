//create the schema of the database
const { transform } = require('lodash')
const mongoose = require('mongoose' )
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required : true,
        minlength : [3,'Username must be atleast 3 characters long, got {VALUE}' ],
        unique : true
    },
    name: String,
    passwordHash: String,
    blogs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Blog'   
    }]
  })

  userSchema.plugin(uniqueValidator)

  userSchema.set('toJSON',{
    // virtuals : true,
    transform: (document,returnedObj) => {
    returnedObj._id = returnedObj._id.toString()
    returnedObj.id = returnedObj._id
    
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.passwordHash
}
  })
  module.exports = mongoose.model('User',userSchema)