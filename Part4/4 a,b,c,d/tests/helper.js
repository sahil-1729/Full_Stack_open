const Blog = require('../models/blog')
const mongoose = require('mongoose')

const listOfBlogs = [
    {
        "title": "My dear Ryan",
        "author": "Ryan gosling",
        "url": "www.google.com",
        "likes": 2,
    },
    {
        "title": "Crane Chronicles",
        "author": "Rick Riordan",
        "url": "www.RickRoll.com",
        "likes": 21,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        "title": "Crane Chronicles",
        "author": "Rick Riordan",
        "url": "www.RickRoll.com",
        "likes": 21
    })
    await blog.save()
    await blog.deleteOne()
    // note._id.toString()
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    // console.log(blogs)
    return blogs.map(val => val.toJSON())
}
module.exports = {
    blogsInDB,
    nonExistingId
}