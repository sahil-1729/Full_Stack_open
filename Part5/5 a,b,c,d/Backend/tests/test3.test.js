const list_helper = require('../utils/list_helper')
test('favorite blog',() => {
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
        author: "Alex Johnson",
        likes: 243
      }
    ]
    const fblog = list_helper.favorite(blog)
    expect(fblog[0].likes).toEqual(243)
})