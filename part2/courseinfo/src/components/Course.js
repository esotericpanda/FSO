const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => <p style={{fontWeight: 'bold'}}>Number of exercises {parts.reduce((a,b)=>a+b.exercises, 0)}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part=><Part part={part} key={part.id} />)}    
  </>


const Course = ({course})=>{
  
  return(
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )

}

export default Course