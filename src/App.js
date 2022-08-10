import React from 'react'
import axios from 'axios'
import Intro from './components/Intro'
import WeatherInfo from './components/WeatherInfo'
import BackButton from './components/BackButton'
import SearchBar from './components/SearchBar'
import cities from './cities-list.json'
import cloud from './assets/cloud.png'
import morning from './assets/morning.jpg'
import night from './assets/night.jpg'

// TO DO: Back button by using locationData as dependency

function App() {
  const [searchLocation, setSearchLocation] = React.useState('')
  const [locationData, setLocationData] = React.useState({})
  const [suggestions, setSuggestions] = React.useState([])
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=470b551e392b1e1dc9e96223b344c461`

  function handleBack() {
    setLocationData({})
    setSearchLocation('')
  }

  function handleSearch(event) {
    if (event.key === 'Enter') {
      axios.get(URL).then(resp => {
        setLocationData(resp.data)
      }).catch(error => error.response.status === 404 ? alert('Search a valid city name.') : null)
    }    
  }

  function onChange(event) {
    let matches =[]
    if (event.target.value) {
      matches = cities.filter(city => {
        const regex = new RegExp(`${event.target.value}`, 'i');
        return city.name.match(regex)
      })
    }

    if (matches.length > 10) {
      let someMatches = matches.slice(0, 10)
      setSuggestions(someMatches)
      setSearchLocation(event.target.value)
    } else {
      setSuggestions(matches)
      setSearchLocation(event.target.value)
    }
  }

  function onSuggest(searchLocation) {
    const URL= `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=470b551e392b1e1dc9e96223b344c461`
    setSearchLocation(searchLocation)
    setSuggestions([])
    axios.get(URL).then(resp => {
      setLocationData(resp.data)
    }).catch(error => error.response.status === 404 ? alert('Search a valid city name.') : null)
  }

  function onBlurHandler() {
    setTimeout(()=> {
      setSuggestions([])
    }, 1000)
  }

  let bg = cloud;
  if (locationData.weather !== undefined) {
    if (locationData.weather[0].icon[2] === 'd') {
      bg = morning;
    } else if (locationData.weather[0].icon[2] === 'n') {
      bg = night;
    } 
  }

  let backgroundStyle = {
    background: `url(${bg}) no-repeat center/cover`
  }

  return (
    <div className="app" style={backgroundStyle}>
      {locationData.name !== undefined && <BackButton handleBack={handleBack}/>}
      <SearchBar searchLocation={searchLocation} onChange={onChange} handleSearch={handleSearch} suggestions={suggestions} onSuggest={onSuggest} onBlurHandler={onBlurHandler}/> 
      {locationData.name === undefined && <Intro />}
      {locationData.name !== undefined && <WeatherInfo locationData={locationData}/>}
    </div>
  );
}

export default App;
