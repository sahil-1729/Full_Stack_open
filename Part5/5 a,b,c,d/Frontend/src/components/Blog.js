import "../index.css"
import { useRef, useState } from "react"
import Toggle from "./Toggle"

const Blog = ({blog,blog_id,addLike,deleteBlog}) => {
  const refff = useRef()
  const savedLogin = window.localStorage.getItem('savedUser')
  const savedUserObj = JSON.parse(savedLogin)
  const hide = blog.user.id === savedUserObj.id
  const hideCss = {display : hide ? '' : 'none'}
  return (
  <div className="blog">
        {console.log(`The blog user's id `,blog.user.id,`Also the saved user is ${savedUserObj.id}`)}
    <div >
    {blog.title}   
    </div>
    {/* {console.log(blog_id)} */}
    <Toggle buttonLabel1='hide' buttonLabel2='view' refs={refff} > 
    <div className="url" >
    {blog.url} 
    </div>
    <div className="like" >
    {blog.likes} 
    </div>
    <button className="likeButton" onClick={(event) => addLike(event,blog_id,blog)} >Like</button>
    <div className="author" >
    {blog.author}   
    </div>
    <button style={hideCss} className="deleteButton" onClick={(event) => deleteBlog(event,blog_id,blog)} >delete</button>
    </Toggle>
  </div>  
)}

export default Blog