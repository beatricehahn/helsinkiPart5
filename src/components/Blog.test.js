import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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

test('clicking the button calls event handler once', async () => {
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

    render(
        <Blog blog={blog} removeBlog={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Remove post')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})