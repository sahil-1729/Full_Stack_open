import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render,screen} from '@testing-library/react'
import Blog from './Blog'
import Toggle from './Toggle'
import userEvent from '@testing-library/user-event'
test('renders blog title and author', async () => {
    const blogs = {
        "title": "Exploring the Wonders of Underwater Photography",
        "author": "David Miller",
        "url": "www.exampleblog.com/exploring-underwater-photography",
        "likes": 112
      }
    let container = render(<Blog blog={blogs} />).container
    // screen.debug()
    let anotherContainer = render(<Toggle buttonLabel1='yes' buttonLabel2='no'/>).container
    const author = anotherContainer.querySelector('.show')
    const title = container.querySelector('.title')
    expect(title).toBeDefined()
    expect(author).toHaveStyle('display : none')
})
test('check the like and url are visible when button is clicked', async () => {
    const blogs = {
        "title": "Exploring the Wonders of Underwater Photography",
        "author": "David Miller",
        "url": "www.exampleblog.com/exploring-underwater-photography",
        "likes": 112
      }
    const mockHandler = jest.fn()
    // let container = render(<Blog blog={blogs} />).container
    // screen.debug()
    let anotherContainer = render(<Toggle buttonLabel1='yes' buttonLabel2='no'/>).container
    const user = userEvent.setup()
    const button = await screen.findByText('yes')
    await user.click(button)


    const author = anotherContainer.querySelector('.show')
    // const title = container.querySelector('.title')
    // expect(title).toBeDefined()
    expect(author).not.toHaveStyle('display : none')
    screen.debug()
    // expect(mockHandler.mock.calls).toHaveLength(1)
})