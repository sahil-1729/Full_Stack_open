const list_helper = require('../utils/list_helper')

describe('mostBlogs',() => {
    
test('max no of blog',() => {
    const blog = [{
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      },
      {
        title : "Introduction to Machine Learning",
        author: "John Smith",
        likes: 126
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
    const fblog = list_helper.mostBlog(blog)
    expect(fblog.author).toBe("John Smith")

})

})