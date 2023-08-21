import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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