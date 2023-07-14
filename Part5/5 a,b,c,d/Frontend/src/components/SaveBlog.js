import { useState } from "react";
function info (...params){
  console.log(...params)
}
const SaveBlogForm = ({addBlog}) => {
  const [newBlog, setnewBlog] = useState({title : '', author : '', url : ''})
  const createBlog = (value) => {
    info(value.name,` `, value.value)
    setnewBlog((result) => (
      {
        ...result,
        [value.name] : value.value
      }
    ))
    info(`The blog to be saved `,newBlog)
  }

    return (
    <form onSubmit={(event) => addBlog(event,newBlog)}>
    <h2>Create a Blog</h2>
    <label >Title</label> 
    
    <div>
    <input id="title" type="text" name='title' value={newBlog.title} onChange={({target}) => createBlog(target)} /> 
    </div>
    
    <label >Author</label> 
    
    <div>
    <input id="author" type="text" name='author' value={newBlog.author} onChange={({target}) => createBlog(target)} /> 
    </div>
    
    <label >Url</label> 
    
    <div>
    <input id="url" type="text" name='url' value={newBlog.url} onChange={({target}) => createBlog(target)} /> 
    </div>
    
    <div>
    <input id="blogSubmit" type="submit" value="Submit"/> 
    </div>
    </form> 
  )
}

  export default SaveBlogForm
