const list_helper = require('../utils/list_helper')

describe('total likes', () => {
    
    test('of bigger list is calculated right',() => {
        const blog = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'GooseBumps',
            author: 'R.L Stine',
            url: 'www.amazon.com',
            likes: 15,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676254d17f1',
            title: 'The Alchemist',
            author: 'Pablo Coulo',
            url: 'www.theAlchemist.com',
            likes: 75,
            __v: 0
        },
    ]
        const result = list_helper.totalLikes(blog)
        expect(result).toBe(95)
    })
    test('of empty list is zero',() => {
        const blog = []
        const result = list_helper.totalLikes(blog)
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that',() => {
        const blog = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }]
        const result = list_helper.totalLikes(blog)
        expect(result).toBe(blog[0].likes)
    })
})