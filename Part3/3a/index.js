const express = require('express')
const app = express()
// const time = require('express-timestamp')
// app.use(time.init)

const cors = require('cors')
app.use(cors())


var morgan = require('morgan')

morgan.token('body',function getBody(request){
  const value = JSON.stringify(request.body)
  return value
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// app.use(morgan('dev'))
app.use(express.json())
let persons =
    [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]



//GET ALL CONTACTS
app.get('/api/persons',(request,response)=>{
    // console.log(`get method worked`)
    response.json(persons)
})
app.get('/info',(request,response)=>{
  const entry = persons.length
  console.log(entry)
  const when = new Date().toUTCString()
  console.log(when)
  response.send(`<div>Phonebook has info for ${entry} people <br/>${when}</div>`)
})
//GET INDIVIDUAL CONTACTS
app.get('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id)
  // console.log(id,typeof id)
  const ob = persons.find(val => val.id === id)
  
  if(ob){    
  // console.log(ob)
  response.json(ob)
  }else{
    response.status(404).send(`The contact is not found`)
  }
})
app.delete('/api/persons/:id',(request,response)=>{
  const id = Number(request.params.id)
  // console.log(id,typeof id)
  const flag = persons.find(val=>val.id===id)
  if(flag){
  persons = persons.filter(val => val.id !== id)
  console.log('successful')
  response.send(`deletion done`)
  }else{
    response.status(404).end(`The contact does not exist`)
  }
  })
const genId = ()=>{

    const max = persons.length>0 
    ? Math.max(...persons.map(val=>val.id)) 
    : 0
    return max + 1
}
app.post('/api/persons',(request,response)=>{
  const content = request.body
  // console.log(content)
  // console.log(`generated id ${genId()}`)
  if(!(content.name && content.number)){
    return response.status(400).json({
      "error" : "name or number is missing"
    })
  }
  const decision = persons.find(val=>val.name===content.name)
  if(decision){
    return response.status(409).json({  
      "error" : "name already exists"
    })
  }
  // console.log(`name `,typeof content.name,`number `,typeof content.number)
  const contact = {
    id : genId(),
    name : content.name,
    number : content.number,
  }
  persons = persons.concat(contact)
  console.log(...persons)
  response.json(contact)

  
})
//JO bhi urls hoenge other than the above, they will get error as given below 
const unknownEndpoint = (request, response) => {
  response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)
const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)