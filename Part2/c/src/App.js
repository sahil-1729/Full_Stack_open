
import Note from './components/Note'
import {useState, useEffect} from 'react'
import axios from 'axios'
const App = () => {
  const [newNote,setNewNote] = useState("")
  const [notes,setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('started')
    axios.get('http://localhost:3001/persons').then((response) => {console.log('response recieved')
    const result = response.data
    console.log(result)
    setNotes(result)
  })
  }
  useEffect(hook,[])

  const notesToShow = notes
  // showAll 
  // ? notes 
  // : notes.filter((val) => (val.important))

  const addNote = (event) => {
    //This prevents reload of the page
    event.preventDefault()
    console.log('button clicked', event.target)
    const Nnote = {
      id : notes.length + 1,
      content : newNote,
      important : Math.random() < 0.5
    }
    setNotes(notes.concat(Nnote))
    //After submitting the text, text will get updated, and the box will remain empty after input
    setNewNote("")
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
    console.log('button clicked', event.target.value)
  }
  return (
    <div>
      <h1>Notes</h1>
        <div>
          <button onClick={() => {
            setShowAll(!showAll)
          }}>Show {showAll ? 'all' : 'imp'}</button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note key={note.id} note={note} />
          )}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNoteChange}/>
          <button type="submit">save</button>
        </form>
    </div>
  )
}

export default App
