const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./helper')
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {info} = require('../utils/logger')

const examples = [
    {
        "title": "Heroes of Nothing",
    "author": "Rick Riordan",
    "url": "www.percyJackson.com",
    "likes": 2
},
{
    "title": "Heroes",
"author": "Rick Riordan",
"url": "www.percyJackson.com",
"likes": 12
}
]

beforeEach(async () => {
    await Blog.deleteMany({})
    info(`deleted`)
    // examples.forEach(async (val) => {
    //     let tobeSaved = new blog(val)
    //     await tobeSaved.save()
    //     info(`saved`)
    // })

    const createdBlogs = examples.map(val => new Blog(val))
    const promiseArr = createdBlogs.map(val => val.save())
    await Promise.all(promiseArr) 

    // let tobeSaved = new blog(examples[0])
    // await tobeSaved.save()
    // tobeSaved = new blog(examples[1])
    // await tobeSaved.save()
    info(`done`)
})

// test('check returned length is same', async () => {
//     const response = await api.get('/api/blogs')
//     expect(response.body).toHaveLength(examples.length)
// })

test('test1', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('unique id', async () => {
    const result = await api.get('/api/blogs/')
    // info(`This is the result`,result.body)
    const dummy = result.body
    // info(`The id `,dummy[0].id)
    // expect(dummy[0].id).toBeDefined()
    dummy.forEach((val) => {
        expect(val.id).toBeDefined()
    })
    // info(result)
})

// test('notes are returned as json', async () => {
//     await api
//       .get('/api/blogs')
//       .expect(200)
//       .expect('Content-Type', /application\/json/)
//   }, 100000)
test('post blog with valid content', async () => {
    const nBlog = {
            "title": "dsfgsag",
            "author": "Ryan gosling",
            "url": "www.google.com",
            "likes": 32,
    }
    const old = await helper.blogsInDB()
    await api.post('/api/blogs').send(nBlog).expect(201)
    .expect('Content-Type',/application\/json/)
    
    const result = await api.get('/api/blogs')
    const arr = result.body
    //after get request
    info(`The length is ${arr.length}, and content is ${arr}`)
    expect(arr).toHaveLength(old.length + 1)
    const title = arr.map(val => val.title)
    // info(title)
    expect(title).toContain('dsfgsag')
})
test('check if default like of blog is zero', async () => {
    const dummy = {
        "title": "dagg jd tre",
    "author": "ndf dj",
    "url": "www.perfjkyJackson.com"
}
    // const blogWithoutLikeInput = new Blog(dummy)
    // info(`the object `,dummy)
    await api.post('/api/blogs').send(dummy).expect(201)
    .expect('Content-Type',/application\/json/)
    const response = await helper.blogsInDB()
    // info(response)
    const blogwith0like = response.find(val => val.author === "ndf dj")
    info(blogwith0like)
    expect(blogwith0like.likes).toBeDefined()
})
test('check the status code is 400 if title of blog missing', async () => {
    info(`test run starts`)
    const nBlog = {
        "author": "Ryan gosling",
        "url": "www.google.com",
        "likes": 32,
}
    await api.post('/api/blogs').send(nBlog).expect(400).expect('Content-Type',/application\/json/)
})
test('show page not found for invalid url', async () => {
    await api.get('/api/blog').expect(400).expect('Content-Type',/application\/json/)
})
test('deletion', async () => {
    const listBlogsPrev = await helper.blogsInDB()
    await api.delete(`/api/blogs/${listBlogsPrev[0].id}`).expect(204)
    const listBlogsNow = await helper.blogsInDB()
    expect(listBlogsNow).toHaveLength(listBlogsPrev.length - 1)
    info(listBlogsNow.length)
    const listBlogTitle = listBlogsNow.map(val => val.title)
    info(listBlogTitle)
    expect(listBlogTitle).not.toContain("Heroes of Nothing")
})
test('check if updation of likes work', async () => {
    const List = await helper.blogsInDB()
    const toBeUpdated = {
        "title": "Heroes of Nothing",
    "author": "Rick Riordan",
    "url": "www.percyJackson.com",
    "likes": 125
}
    const updated = await api.put(`/api/blogs/${List[0].id}`).send(toBeUpdated).expect(200).expect('Content-Type',/application\/json/)
    info(updated.body)
    const updatedObject = updated.body
    expect(updatedObject.likes).toBe(toBeUpdated.likes)
})
describe('If there exist one user in db', () => {
    BeforEach(async () => {
        await User.deleteMany({})
        const hash = bcrypt.hash('secret',10)
        const obj = {
            username : "coolnaam",
            name : "naam",
            password : hash
        }
        const result = new User(obj)
        await result.save()
    })

})
afterAll(async () => {
    await mongoose.connection.close()
})