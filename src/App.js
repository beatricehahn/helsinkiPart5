import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  // blogs from db
  const [blogs, setBlogs] = useState([])

  // states for login credentials
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // states for creating a new blog
  const [newBlog, setNewBlog] = useState({
    url: '',
    title: '',
    author: ''
  })


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  // checks if user details of logged-in user are already found in local storage
  // then if so, details are saved in app
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // login handler
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      // save token to browser's local storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      blogService.setToken(user.token)
      setUser(null)
      console.log('Logging out');
    } catch (exception) {
      console.log('Error logging out');
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      const token = loggedUserJSON.token

      blogService.setToken(token)

      blogService.create(newBlog)

      // reset blog
      setNewBlog({
        url: '',
        title: '',
        author: ''
      })
    } catch (exception) {
        setErrorMessage('Error creating a new blog post')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }

    console.log('submitted a new blog')
  }

  const handleUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value})
  }

  const handleTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value })
  }

  const handleAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value })
  }

  const blogForm = () => (
    <div>
      <form onSubmit={handleCreate}>
        <label>Url:</label>
        <input type='text' value={newBlog.url} onChange={handleUrlChange}></input>

        <label>Title:</label>
        <input type='text' value={newBlog.title} onChange={handleTitleChange}></input>

        <label>Author:</label>
        <input type='text' value={newBlog.author} onChange={handleAuthorChange}></input>

        <button type='submit'>Add blog</button>
      </form>
    </div>
  )

  return (
    <div>
      <h1>Blogs list</h1>

      {!user && loginForm()}
      {user && <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Log out</button>
          {blogForm()}
        </div>
      }
  

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App