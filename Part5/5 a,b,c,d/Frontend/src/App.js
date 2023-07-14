import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggle from './components/Toggle'
import SaveBlogForm from './components/SaveBlog'
function info (...params){
  console.log(...params)
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const savedLogin = window.localStorage.getItem('savedUser')
    if(savedLogin){
    const savedObj = JSON.parse(savedLogin)
    setUser(savedObj)
    blogService.setToken(savedObj.token)
    info(`Token saved`)
  }},[])
  const change = (val,type) => {
    
    if(type === 1){
      // console.log(val)
      setUsername(val)
      // console.log(username)
    }
    if(type === 2){
      // console.log(val)
      setPassword(val)
      // console.log(password)
    }
  }

  const result = async (event) => {   
    event.preventDefault()
    try{
      const user = await loginService.getLogin({username : username, password : password})
      setUser(user)
      info(user)
      window.localStorage.setItem('savedUser',JSON.stringify(user))
      setUsername('')
      setPassword('')
      const savedLogin = window.localStorage.getItem('savedUser')
      if(savedLogin){
      const savedObj = JSON.parse(savedLogin)
      setUser(savedObj)
      blogService.setToken(savedObj.token)
      info(`Token saved`)
      }
    }catch(exception){
      setMessage('Invalid username or password')
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  } 

  // const createBlog = (value) => {
  //   info(value.name,` `, value.value)
  //   setnewBlog((result) => (
  //     {
  //       ...result,
  //       [value.name] : value.value
  //     }
  //   ))
  //   info(`The blog to be saved `,newBlog)
  // }

  const addBlog = async (event,newBlog) => {
    event.preventDefault()
    // info(`clicked`)
    const result = await blogService.create(newBlog)
    info(result)
    setMessage(`The new blog ${result.title} has been added`)
    setTimeout(()=>{
      setMessage(null)
    },5000)
    const updatedBlogs = await blogService.getAll()    
    setBlogs(updatedBlogs)
  }

  const form = () => (
    <form onSubmit={result}>
    <h1>Login</h1>
  <label >Username</label> <br/>
  <input className='username' type="text" value={username} name="Enter_your_username" onChange={({target}) => change(target.value,1)} /> <br/>
  <label >Password</label> <br/>
  <input className='password' type="password" value={password} name="Enter_your_password" onChange={({target}) => change(target.value,2)} /> <br/>
  <input className='sub' type="submit" value="Submit"/>
  </form> 
  )

  // const saveBlogForm = () => (
  //   <form onSubmit={(event) => addBlog(event)}>
  //   <h2>Create a Blog</h2>
  // <label >Title</label> <br/>
  // <input type="text" name='title' value={newBlog.title} onChange={({target}) => createBlog(target)} /> <br/>
  // <label >Author</label> <br/>
  // <input type="text" name='author' value={newBlog.author} onChange={({target}) => createBlog(target)} /> <br/>
  // <label >Url</label> <br/>
  // <input type="text" name='url' value={newBlog.url} onChange={({target}) => createBlog(target)} /> <br/>
  // <input type="submit" value="Submit"/> 
  // </form> 
  // )

  const update = async() => {
    const result = await blogService.getAll()
    setBlogs(result)
  }
  const addLike = async(event,b_id,blog) => {
    event.preventDefault()
    const {title,author,url} = blog
    const modifiedObj = {
      title,
      author,
      url,
      likes : blog.likes + 1
    }
    // await blogService.put(b_id,modifiedObj)
    // const result = await blogService.getAll()
    // setBlogs(result)
    await blogService.put(b_id,modifiedObj)
    await update()
  }

  const deleteBlog = async (event,b_id,blog) => {
    try {
      const result = window.confirm(`Do you really want to delete ${blog.title}`)
      if(result){
      event.preventDefault()
      await blogService.removeBlog(b_id,blog)
      await update()
      }
    } catch (error) {
      info(`The error`,error)
      setMessage(error)
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
    
  }

  return (
    <div>
      <br/>
  <h1>
  {message}
  </h1>
  {/* {info(`The username is `,username)} */}
  {/* {info(`The password is `,password)} */}
  {user === null ? form() : <div>
    <Toggle buttonLabel1='cancel' buttonLabel2='create new blog'>
      <SaveBlogForm addBlog={addBlog} />
    </Toggle>
    <h1>Blogs</h1>
    <h2>
    {user.username} just logged in <br/>
    <button onClick={logout}>logout</button>
    </h2>
      {info(blogs.sort((a,b) => a.likes - b.likes))}
      {info(blogs.reverse())}
      {blogs.map(blog => <Blog key={blog.id} blog_id={blog.id} addLike={addLike} deleteBlog={deleteBlog} blog={blog} />
      )}
    </div>}
  {/* {info(`The user is `,user)} */}
  
    </div>
  )
}

export default App