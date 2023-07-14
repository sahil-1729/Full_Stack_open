const list_helper = require('../utils/list_helper')
test('check the content',() => {
    const blog = []
    const result = list_helper.dummy(blog)
    expect(result).toBe(1)
})

