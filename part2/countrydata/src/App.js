import { useEffect, useState } from 'react';
import axios from 'axios';


const CountryList = ({countries})=>
<div>
        {countries.map(ctr=><div key={ctr.alpha3Code}>{ctr.name}</div>)}
</div>


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

  
    let mainContent;
    if(countriesToShow.length<=10){
      mainContent=<CountryList countries={countriesToShow}/>
    }else{
      mainContent=<div>Too many matching countries</div>
    }

  return(
    <div>
      <span>find countries<input value={name} onChange={(event)=>{setName(event.target.value)}}/></span>
      {mainContent}
    </div>
  )
}

export default App;
