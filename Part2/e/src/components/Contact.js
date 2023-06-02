import App from "../App";
import axios from 'axios'
import Service from "../services/ContactService";
const Contact = ({ naam, number, id,setPersons }) => {
  const del = ({id,setPersons} ) => {
    // const updated = result.filter((val) => val.id !== key)
    const val = window.confirm(`You sure want to delete this?`)
    console.log(val)
    if(val){

    //undo
      Service.remove(id)
      .then(response=>{
        console.log(response)

      })

    
    // setResult(updated)
    // console.log(id,`hi`)

    axios
    .get(`http://localhost:3001/persons/${id}`)
    .then(response=>alert(`The contact ${response.data.name} is being deleted`))
    .catch(error=>console.log(error.data))
    
    Service.get()
    .then(response => {
      setPersons(response)
      console.log(`rendering...`)
    })


  }
    
    
  }
  return (
    <div>
      {naam} {number}{" "}
      <button
        onClick={() => {
          del({id,setPersons})
        }}
      >
        del
      </button>
    </div>
  );
};
export default Contact;
