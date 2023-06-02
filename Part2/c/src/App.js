import Note from "./components/Note";
import { useState, useEffect } from "react";
import axios from "axios";
import noteService from "./services/notes";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService
    .getAll()
    .then((response) => {
      setNotes(response);
    });
  }, []);

  const toggleImportance = (id) => {
    const url = `http://localhost:3001/persons/${id}`;
    const obj = notes.find((val) => {
      return val.id === id;
    });
    const changed = { ...obj, important: !obj.important };

    noteService
    .update(id, changed)
    .then((response) => {
      setNotes(
        notes.map(note => 
           note.id !== id ? note : response
        )
      );
    }).catch((error) => {
      console.log(`The ${obj.content} was deleted from the server`)
      alert(` ${obj.content} and was deleted`)
      // console.log(error)
      setNotes(notes.filter(val => val.id !== id))
    })

    console.log(`importance of ${id} needs to be toggled`);
  };

  // const hook = () => {
  //   console.log("started");
  //   axios.get("http://localhost:3001/persons").then((response) => {
  //     console.log("response recieved");
  //     const result = response.data;
  //     console.log(result);
  //     setNotes(result);
  //   });
  // };
  // useEffect(hook, []);

  const notesToShow = notes;
  // showAll
  // ? notes
  // : notes.filter((val) => (val.important))

  const addNote = (event) => {
    //This prevents reload of the page
    event.preventDefault();
    // console.log('button clicked', event.target)
    const Nnote = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };

    // axios.post("http://localhost:3001/persons", Nnote).then((response) => {
    //   console.log(response);
    // });

    noteService
    .create(Nnote)
    .then((response) => {
      setNotes(notes.concat(response));
      //After submitting the text, text will get updated, and the box will remain empty after entering the input
      setNewNote("");
    });
  };
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
    // console.log('button clicked', event.target.value)
  };
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          Show {showAll ? "all" : "imp"}
        </button>
      </div>
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            content={note.content}
            toggleImportance={() => {
              toggleImportance(note.id);
            }}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
