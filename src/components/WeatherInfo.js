import React from 'react'

export default function WeatherInfo(props) {
  let data = props.locationData

  function kelvinToCelcius(temp) {
    return (
      Math.round(temp-273.15)
    )
  }

  function handleWeatherDescription(desc) {
    const words = desc.split(" ")
    let newWords = words.map(word => word[0].toUpperCase() + word.substr(1))
    return newWords.join(" ") 
  }

    return (
      <>
          <div className="container">

            <div className="top">
              <div>
                <div className="location">
                  <p>{data.sys ? `${data.name}, ${data.sys.country}` : null}</p>
                </div>
                <div className="temp">
                  <h1>{data.main ? `${kelvinToCelcius(data.main.temp)}°C` : null}</h1>
                </div>
              </div>
              <div className="weather">
                <p className="weather-description">{data.weather ? data.weather[0].main : null}</p>
                <img className="weather-icon" src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt='weather_icon'></img>
                <p className='small'>{data.weather ? handleWeatherDescription(data.weather[0].description) : null}</p>
              </div>
            </div>

            <div className="bottom">
              <div className="feels">
                <p className="bold">{data.main ? `${kelvinToCelcius(data.main.feels_like)}°C` : null}</p>
                <p className="small">Feels Like</p>
              </div>
              <div className="humidity">
                <p className="bold">{data.main ? `${data.main.humidity}%` : null}</p>
                <p className="small">Humidity</p>
              </div>
              <div className="wind">
                <p className="bold">{data.wind ? `${data.wind.speed}mph` : null}</p>
                <p className="small">Wind</p>
              </div>
            </div>

          </div>
      </>
      
    )
}