import { useState } from 'react'

const Change = ({val,mod,array,vote,setVote}) => {
  const popular = () => {
    const copy = [...vote]
    copy[val] = copy[val] + 1
    // vote = [...copy]
    //While using the setVote function, when assigning it with array, only the name of the array is needed
    // e.g setVote(...copy) ❌ 
    setVote(copy)
    // console.log(...copy)
  }

  const modify =() => {
    const min = Math.ceil(0);
    const max = Math.floor(array.length);
    const newInd = parseInt(Math.random() * (max-min) + min)
    mod(newInd)
    // console.log(newInd)
  }
  return (
    <div>
      <button onClick={popular} >Vote</button>
      <button onClick={modify}>Next</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const v = Array(anecdotes.length).fill(0)
  const [vote,setVote] = useState(v)
  console.log(...vote)
  const [selected, setSelected] = useState(0)
  const max = Math.max(...vote)
  const ind = vote.indexOf(max)
  console.log(ind)
  return (
    <div>
      {anecdotes[selected]}
      <Change setVote={setVote} vote={vote} array={anecdotes} val={selected} mod={setSelected}></Change>
      <h1>Most popular Quote</h1>
      {anecdotes[ind]}
    </div>
  )
}

export default App






// While naming the variables(outside the main function), unko access karne ke liye, write the first letter with capital letter, to access, else access nai hoga
// const Emo = ( {name,variable,func} ) => {
//   const change = () => {
//     // Use new variable to increment the value, because if you do it directly, then tujhe twice times click karna padega to increment
//     // Here's the link https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#update-of-the-state-is-asynchronous
//     const newvar = variable + 1 
//     func(newvar)
//   }
  
//   return (
//     <button onClick={change}>{name}</button>
//   )
// }

// const Divide = ({type,value}) => {
//   return (
//     <div>{type} {value} </div>
//   )
// }
// const Result = (part) => {
  
//   if(part.good === 0 && part.neutral === 0 && part.bad === 0){
//     return <div>
//       Feedback not given
//     </div>
//   }
//   return (
//     <div>
//       <Divide type="good" value={part.good}></Divide>
//       <Divide type="neutral" value={part.neutral}></Divide>
//       <Divide type="bad" value={part.bad}></Divide>
//       <div>all {part.bad + part.good + part.neutral}</div>
//       <div>average {(part.good+part.neutral+part.bad)/3}</div>
//       <div>positive {(part.good/(part.good+part.neutral+part.bad))*100}%</div>
//     </div>
//   ) 
// }
// const App = () => {
//   // save clicks of each button to its own state
//   const [good, setGood] = useState(0)
//   const [neutral, setNeutral] = useState(0)
//   const [bad, setBad] = useState(0)

//   return (
//     <div>
//       <h1>give feedback</h1>
//       <Emo name="good" variable={good} func={setGood}> </Emo>
//       <Emo name="neutral" variable={neutral} func={setNeutral}> </Emo>
//       <Emo name="bad" variable={bad} func={setBad}> </Emo>

//       <h1>Statistics</h1>
//       <Result good={good} neutral={neutral} bad={bad}></Result>
//       {/* 
//       <Result one="all" two={bad+good+neutral}></Result>
//       <Result one="average" two={(bad+good+neutral)/3}></Result>
//       <Result one="positive" two={(good/(good+bad+neutral))*100}></Result> */}
//     </div>
//   )
// }


// export default App

// import { useState } from 'react'
// const Display = ({counter}) => {
//   return (
//     <div>{counter}</div>
//   )
// }
// const Button = ({handleclick,text}) =>{
//   return <div>
//     <button onClick={handleclick}>
//       {text}
//     </button>
//   </div>
// }
// const History = (props) => {
//   if(props.allClicks.length === 0){
//     return(
//       <div>
//         The app is used by pressing the buttons
//       </div>
//     )
//   }
//   return(
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }
// const App = () => {
//   const [value,setValue] = useState(10)
//   const handleClick = () => {
//     console.log('Clicked the button')
//     setValue(0)
//   }
//   const setToValue = (number) => {
//       console.log(`Hello new Value ${number}`)
//       setValue(number)
//   }
//   return(
//     <div>
//       {value}
//       <button onClick={setToValue(1)}>Click Me for 1!</button>
//       <button onClick={setToValue(2)}>Click Me for 2!</button>
//       <button onClick={setToValue(value)}>Click Me for 3!</button>
//     </div>
//   )
// }

// export default App

// const Header = (course)=>{
//   return(
//     <div>
//       {course.name}
//     </div>
//   )
// }
// const Total = (exercise) => {
//   return (
//     <div>
//       Number of exercises {exercise.one + exercise.two + exercise.three}
//     </div>
//   )
// }
// const Part = (part) => {
//   return (
//     <div>
//       <p>{part.one} {part.two}</p>
//       {/* <p>{part.three} {part.four}</p>
//       <p>{part.five} {part.six}</p> */}
//     </div>
//   )
// }
// const Content = (prop) => {
//   return (
//     <div>
//       <Part one={prop.one} two={prop.two}></Part>
//       <Part one={prop.three} two={prop.four}></Part>
//       <Part one={prop.five} two={prop.six}></Part>
//     </div>
//     )
// }
// const App = () => {
//     // const course = 'Half Stack application development'
//     const course = {
//       name: 'Half Stack application development',
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7
//         },
//         {
//           name: 'State of a component',
//           exercises: 14
//         }
//       ]
//     }
//     return (
//       <div> 
//         <Header name={course.name}></Header>
//         <Content one={course.parts[0].name} two={course.parts[0].exercises} three={course.parts[1].name} four={course.parts[1].exercises} five={course.parts[2].name} six={course.parts[2].exercises}></Content>
//         <Total one={course.parts[0].exercises} two={course.parts[1].exercises} three={course.parts[2].exercises} >   </Total>
//       </div>
//       )
// }
// export default App