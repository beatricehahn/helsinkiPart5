import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Toggler from './Toggler'

test('renders blog content', () => {
    const blog = {
        title: 'Sample title',
        url: 'sampleurl.com',
        author: 'Mike Ross',
        likes: 7,
        user: {
            name: 'jenny'
        }
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText('Sample title')
    expect(element).toBeDefined()
})

// test('clicking the button calls event handler once (remove button)', async () => {
//     const blog = {
//         title: 'Sample title',
//         url: 'sampleurl.com',
//         author: 'Mike Ross',
//         likes: 7,
//         user: {
//             name: 'jenny'
//         }
//     }

//     const mockHandler = jest.fn()

//     render(
//         <Blog blog={blog} removeBlog={mockHandler} />
//     )

//     const user = userEvent.setup()
//     const button = screen.getByText('Remove post')
//     await user.click(button)

//     expect(mockHandler.mock.calls).toHaveLength(1)
// })

test('after clicking view button, likes and url are shown', async () => {
    const blog = {
        title: 'Sample title',
        url: 'sampleurl.com',
        author: 'Mike Ross',
        likes: 7,
        user: {
            name: 'jenny'
        }
    }

    const mockHandler = jest.fn()

    let container = render(
        <Blog blog={blog} >
            <Toggler primaryLabel='view' secondaryLabel='hide' >
                <div>
                    <button onClick={mockHandler}>view</button>
                </div>
            </Toggler>
        </Blog>
    ).container

    const user = userEvent.setup()
    const div = container.querySelector('.hiddenByDefault')
    const button = div.querySelector('.primaryButton')
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)

    const url = screen.getByText('sampleurl.com')
    expect(url).toBeDefined()

    const likes = screen.getByText('7')
    expect(likes).toBeDefined()

})