const Header = (props)=>{
  return (
      <h1>{props.course}</h1>
  )
}

const Total = (props)=>{
  return (
    <p>Number of exercises {props.i + props.ii + props.iii}</p>
  )
}





const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <Total i={exercises1} ii={exercises2} iii={exercises3} />
    </div>
  )
}

export default App