const list_helper = require('../utils/list_helper')

describe('mostLikes',() => {
    
test('max no of likes',() => {
    const blog = [{
        title: "Canonical string reduction",
        author: "Jane Doe",
        likes: 12
      },
      {
        title : "Introduction to Machine Learning",
        author: "Richard Franklin",
        likes: 926
      },
      {
        title: "The Art of Writing Clean Code",
        author: "Jane Doe",
        likes: 87
      },
      {
        title: "Understanding Blockchain Technology",
        author: "John Smith",
        likes: 243
      }
    ]
    const mLike = list_helper.mostLikes(blog)
    expect(mLike.author).toBe("Richard Franklin")

    })
})