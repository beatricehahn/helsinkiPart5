import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggler from './components/Toggler'

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
      console.log('token is ', user.token);

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

  const handleCreate =  (event) => {
    event.preventDefault()

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ url: '', title: '', author: '' })
        setErrorMessage(`a new blog ${newBlog.title} was created`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
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

  return (
    <div>
      <h1>Blogs list</h1>
      <Notification message={errorMessage} />

      {!user && 
        <LoginForm 
          handleLogin={handleLogin}
          username={username} 
          password={password} 
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
        />
      }

      {user && 
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Log out</button>

          <Toggler buttonLabel='add new blog'>
            <BlogForm
              newBlog={newBlog}
              handleCreate={handleCreate}
              handleUrlChange={handleUrlChange}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
            />
          </Toggler>
          
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
  
    </div>
  )
}

export default App