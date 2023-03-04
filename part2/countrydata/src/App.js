import { useEffect, useState } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const CountryList = ({countries, setChosenCountry})=>
<div>
        {countries.map(ctr=><div key={ctr.alpha3Code}>
          {ctr.name} <button onClick={()=>{setChosenCountry(ctr)}}>show</button>
          </div>)}
</div>


const WeatherPanel = ({country})=>{

  const [weather, setWeather] = useState(null)

  useEffect(()=>{
    console.log('calling API')
    axios
    .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&limit=5&appid=${api_key}`)
    .then((res)=>{
      const lat = res.data[0].lat
      const lon= res.data[0].lon
      return axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    }).then(res=>{
      setWeather(res.data)
    })
  },[])

  if(weather){
    return(
      <div>
        <h1>Weather in {country.capital}</h1>
        temperature: {weather.main.temp} <br/>
        min: {weather.main.temp_min} max: {weather.main.temp_min}<br/>
        wind speed: {weather.wind.speed}<br/>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      </div>
    )
  }else{
    return null
  }
}

const CountryPanel = ({country})=>{
  const [flag, setFlag] = useState('');

  useEffect(()=>{
    axios
    .get(country.flag)
    .then(res=>setFlag(res.data))
  },[])


  
  return(
    <div>
      <h1>{country.name}</h1>
      <div>Population: {country.population}</div>
      <div>Area: {country.area}</div>
      <div>Capital: {country.capital}</div>
      <div>
        Languages:
        <ul>
        {country.languages.map(l=><li key={l.name}>{l.name}</li>)}
        </ul>
      </div>
      {flag ? <img src={`data:image/svg+xml;utf8,${encodeURIComponent(flag)}`}  style={{ borderStyle: 'solid', maxWidth: 200}} />: ''}
      <WeatherPanel country={country}/>
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
  
  // useEffect(()=>{
  //   console.log(api_key)
  //   axios
  //   .get(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${api_key}`)
  //   .then((res)=>{
  //     const lat = res.data[0].lat
  //     const lon= res.data[0].lon
  //     return axios
  //     .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
  //   }).then(res=>{console.log(res.data)})
  // },[])


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
