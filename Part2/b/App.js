import { useState } from 'react'
import Contact from './components/Contact'
const Details = ({value}) => {
  // console.log(...value)
  return (
    <div>
      {value.map(val => <Contact key={val.id} naam={val.name} number={val.number}></Contact>)}
    </div>
  )
}
const Filter = ({search,persons,setFilter,change}) => {
    
    
  const filt = (event) => {
    event.preventDefault()
  console.log(search)
  const trim = search.trim()
  const scaps = trim.toUpperCase()
  const fill = persons.filter((val) => {
    const naam = val.name
    const caps = naam.toUpperCase()
    console.log(caps.match(scaps))
    return caps.match(scaps)
  })
  setFilter(fill)
  // console.log(...val)
  }
  return (
    <div>
      <input value={search} onChange={(event) => {change(event,3)}}/>
    <button type="submit" onClick={filt}>Search</button> 
    </div>
  )
}
const Box = ({type,value,change,number}) => {
  return  (
    <span>
      {type}<input value={value} onChange={event => change(event,number)}/> 
    </span>
    
  )
}
const Input = ({newName,newNumber,change}) => {
  return (
    <div>
          {/* name: <input value={newName} onChange={event => change(event,1)}/> */}
          <Box type="Name" value={newName} change={change} number={1}></Box>
          <Box type="Number" value={newNumber} change={change} number={2}></Box>
          
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
      id : 1,
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  //NAME
  const [newName, setNewName] = useState('')
  //NUMBERS
  const [newNumber, setNewNumber] = useState('')
  //FILTER
  const [ filter,setFilter] = useState([])
  //SEARCH
  const [search,setSearch] = useState('')

  const change = (event,value) => {
    // console.log(event.target.value)
    if(value === 1){
      setNewName(event.target.value)
      console.log(`name changed ${newName}`)
    }
    if(value === 2){
      setNewNumber(event.target.value)
      console.log(`number changed ${newNumber}`)
    }
    if(value === 3){
      setSearch(event.target.value)
      console.log(`search value ${search}`)
    }
  }

  var val = (search === '') ? persons : filter


  const Add = (event) => {
      event.preventDefault()
      const decision = (newName === '' && newNumber === '') ? alert("Please enter your name and number") : (newName === '') ? alert("Please enter your name") : (newNumber === '') ? alert("Please enter your number") : true
      if(decision){
        const result = persons.reduce((dec,val)=>{
          if(newName === val.name){
            dec = false
            // console.log("same")
            alert(`${newName} already exist!`)
          }
          if(newNumber === val.number){
            dec = false
            alert(`${newNumber} already exist!`)
          }
          return dec
        },true)
        // console.log(result)
        if(result){
          const contact = {
            id : persons.length +1,
            name : newName,
            number : newNumber
          }
          setPersons(persons.concat(contact))
          setNewName('')
          setNewNumber('')
        }
      }
      
      
    }
    // console.log(...persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <Input newName={newName} newNumber={newNumber} change={change} >
        
        </Input>

          {/* Write only function's name, don't need to write the paramters of the function, only function call */}
          <button type="submit" onClick={Add}>add</button>
      </form>
      <div>
      
      <Filter search={search} persons={persons} setFilter={setFilter} change={change}></Filter>
      </div>
      <h2>Numbers</h2>
      <div>
      <Details value={val}>
      </Details>
      {/* {val.map(val => <Contact key={val.id} naam={val.name} number={val.number}></Contact>)} */}
      </div>
      </div>
  )
}

export default App