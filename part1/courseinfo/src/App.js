const Header = (props)=>(
      <h1>{props.course}</h1>
  )


const Part = (props)=>{
  const part = props.part;
  return(
    <p>{part.name} {part.exercises}</p>
  )
}
const Content = (props)=>{
  const parts = props.source;
  return (
  <div>
    <Part part={parts[0]}/>
    <Part part={parts[1]}/>
    <Part part={parts[2]}/>
  </div>
)
}


const Total = (props)=>{
  const number = props.source.map(obj=>obj.exercises).reduce((a,b)=>a+b, 0);
  return(
    <p>Number of exercises {number}</p>
  )
}
    
  






const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const allParts = [part1, part2, part3];

  return (
    <div>
      <Header course={course} />
      <Content source={allParts}/>
      <Total source={allParts} />
    </div>
  )
}

export default App