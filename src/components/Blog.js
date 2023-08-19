import blogService from "../services/blogs.services"

import Toggler from "./Toggler"

import './styles/Blog.styles.css'


const Blog = ( {blog} ) => {
  const addLike = () => {
    const toUpdate = { 
      url: blog.url, 
      title: blog.title,
      author: blog.author, 
      likes: blog.likes + 1}

    blogService
      .update(blog.id, toUpdate)
      .then(() => {
        console.log('Updated blog by adding a like')
      })
  }

  return (
    <div className='blogWrapper'>
      <div className='innerWrapper'>
        <b>{blog.title}</b> by <i>{blog.author}</i>
        <Toggler primaryLabel='view' secondaryLabel='hide'>
          <div>
            {blog.url}
            <br/>
            likes: {blog.likes} <button onClick={addLike}>like</button>
            <br/>
            Added by: {blog.user.name}
          </div>
        </Toggler>
      </div>
    </div>  
  )
}

export default Blog