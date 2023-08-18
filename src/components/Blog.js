import Toggler from "./Toggler"
import './styles/Blog.styles.css'

const Blog = ( {blog} ) => (
  <div className='blogWrapper'>
    <div className='innerWrapper'>
      {blog.title} by {blog.author}
      <Toggler primaryLabel='view' secondaryLabel='hide'>
        <div>
          {blog.url}
          <br/>
          likes: {blog.likes} <button>like</button>
          <br/>
        </div>
      </Toggler>
    </div>
  </div>  
)

export default Blog