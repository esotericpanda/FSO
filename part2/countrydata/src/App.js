import { useEffect, useState } from 'react';
import axios from 'axios';


const CountryList = ({countries, setChosenCountry})=>
<div>
        {countries.map(ctr=><div key={ctr.alpha3Code}>
          {ctr.name} <button onClick={()=>{setChosenCountry(ctr)}}>show</button>
          </div>)}
</div>

const CountryPanel = ({country})=>{
  const [flag, setFlag] = useState('');

  useEffect(()=>{
    axios
    .get(country.flag)
    .then(res=>setFlag(res.data))
  },[])
  
  return(
    <div>
      <div>Name: {country.name}</div>
      <div>Population: {country.population}</div>
      <div>Area: {country.area}</div>
      {flag ? <img src={`data:image/svg+xml;utf8,${encodeURIComponent(flag)}`} />: ''}
    </div>
  )
}

const MainContent =({countries})=>{

  const [chosenCountry, setChosenCountry] = useState(null);

  if(chosenCountry){
    return(
      <div>
        <button onClick={()=>{setChosenCountry(null)}}>return</button>
        <CountryPanel country={chosenCountry}/>
      </div>
    )
  }


  if(countries.length === 1){
    return <CountryPanel country={countries[0]}/>
  }else if (countries.length <= 10 ){
    return <CountryList countries={countries} setChosenCountry={setChosenCountry}/>
  }else{
    return <div>Too many matching countries</div>
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [name, setName] = useState('')

  useEffect(()=>{
    axios
    .get("https://restcountries.com/v2/all")
    .then(res=>{setCountries(res.data)})
    
  },[])
  


  const countriesToShow = name
    ? countries.filter(country=> country.name.toLowerCase().includes(name.toLowerCase()))
    : []


  return(
    <div>
      <span>find countries<input value={name} onChange={(event)=>{setName(event.target.value)}}/></span>
      <MainContent countries={countriesToShow}/>
    </div>
  )
}

export default App;
