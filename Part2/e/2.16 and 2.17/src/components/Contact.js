import App from "../App";
import axios from 'axios'
import Service from "../services/ContactService";
const Contact = ({ naam, number, id, persons, setPersons,setErrorM }) => {
  const del = () => {
    // const updated = result.filter((val) => val.id !== key)
    console.log(`the value of seterror`,setErrorM, setPersons)
    const val = window.confirm(`You sure want to delete this?`)
    console.log(val)
    if(val){
      Service.remove(id)
      .then(response=>{
        console.log(response)
      })
      .catch(error => {
        // alert(`The contact has been already deleted`)
        console.log(`delete error`,error.data)
        
        const errId = persons.find(val => val.id === id) 
        // console.log(`The one deleted`,errId)
        setErrorM(`The contact ${errId.name} has already been deleted`)
        setTimeout(()=>{
          setErrorM(null)
        },5000)
      })
    axios
    .get(`http://localhost:3001/persons/${id}`)
    .then(response=>{
      // alert(`The contact ${response.data.name} is being deleted`)
      setErrorM(`The contact ${response.data.name} has been deleted`)
        setTimeout(()=>{
          setErrorM(null)
        },5000)
    })
    .catch(error=>console.log(`message error`,error.data))
    
    Service.get()
    .then(response => {
      setPersons(response)
      console.log(`rendering...`)
    })
    .catch(error=>console.log(`get `,error.data))
  }
  }
  return (
    <div>
      {naam} {number}{" "}
      <button
        onClick={del}
      >
        del
      </button>
    </div>
  );
};
export default Contact;
