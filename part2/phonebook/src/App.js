import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/personService'


const Filter = ({toMatch, handler})=>(
<div>filter shown with <input value={toMatch} onChange={handler}/></div>
)

const PersonForm = ({submitPerson,newName,handleNameChange,newNumber,handleNumberChange})=>(
  <form onSubmit={submitPerson}>
  <div>
    name: <input value={newName} onChange={handleNameChange}/>
  </div>
  <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)

const Persons = ({visiblePersons})=>(
  <div>
  {visiblePersons.map(person=><Person key={person.name} person={person}/>)}
  </div>
)

const Person = ({person})=>(
<p >{person.name} {person.number}</p>
)

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(()=>{
    personService
    .getAll()
    .then(res=>{
      setPersons(res)
    })
  },[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [toMatch, setToMatch] = useState('')

  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange=(event)=>{
    setToMatch(event.target.value)
  }


  const submitPerson = (event)=>{
    event.preventDefault()

    if(persons.some(person=>person.name===newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    const newPerson ={
      name: newName,
      number: newNumber
    }

    personService
    .addPerson(newPerson)
    .then(res=>{setPersons(persons.concat(res))})


    setNewName('')
    setNewNumber('')
  }
  const visiblePersons = !toMatch ? persons  : persons.filter(person=>person.name.toLowerCase().includes(toMatch.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilterChange} toMatch={toMatch}/>
      <h2>Add new</h2>
      <PersonForm submitPerson={submitPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons visiblePersons={visiblePersons}/>
    </div>
  )
}

export default App