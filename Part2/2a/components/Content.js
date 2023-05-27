const Parts = ({naam,exercise}) => {
    return (
      <div>
        {naam} {exercise}
      </div>
    )
  }
  
  const Content = ({array}) => {
    const result = array.reduce((sum,val) => {
      console.log(sum)
      return sum = sum + val.exercises
    },0)
    console.log(result)
    return(
      <div>
        {array.map(val => <Parts key={val.id} naam={val.name} exercise={val.exercises}></Parts>)}
        <h3>
        Total of {result} Exercises
        </h3>
      </div>
    )
  }
export default Content