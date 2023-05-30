import Header from './Header'
import Content from './Content'

const Course = ({course}) => {
  return (
    <div>
      <Header head={course.name}></Header>
      <Content array={course.parts}></Content>
    </div>
  )
}

export default Course