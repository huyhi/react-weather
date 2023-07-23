import { useEffect, useState } from 'react';
import '../styles/headbar.css'
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { isEmptyObj } from '../common';
import { apis, Q_WEATHER_HOST, OPEN_WEATHER_HOST } from '../api'
import Link from 'next/link';


function LocationWeather() {

  const [cityLabel, setCityLabel] = useState('')
  const [weather, setWeather] = useState({})

  useEffect(() => {getGeoLocation(setGeoLocationWeather)}, [])

  const getGeoLocation = (locationHandler) => {
    if (!navigator.geolocation) {
      console.log('navigator.geolocation undefinded. Not support to get geo location')
      return
    }
    navigator.geolocation.getCurrentPosition(locationHandler)
  }
  
  const setGeoLocationWeather = (pos) => {
    const [lat, lon] = [pos.coords.latitude, pos.coords.longitude]
    apis
      .get(Q_WEATHER_HOST, '/city/lookup', {location: `${lon.toFixed(2)},${lat.toFixed(2)}`, number: 1})
      .then((responseData) => {
        if (responseData.code !== '200') {
          return
        }
        let city = responseData.location[0]
        setCityLabel(`${city.name}, ${city.adm1}`)
      })
    apis
      .get(OPEN_WEATHER_HOST, '/onecall', {lat: lat, lon: lon, units: 'metric'})
      .then((responseData) => {
        if (responseData.code !== undefined) {
          console.log(`fetch weather data error ${responseData}`)
          return
        }
        setWeather(responseData)
      })
  }

  if (!cityLabel || isEmptyObj(weather)) {
    return <></>
  }

  return (
    <div className='location-weather'>
      <div> {cityLabel} </div>
      <div className='temp'> {Math.round(weather.current.temp)}°C </div>
      <div className='weather-img' style={{backgroundImage: `url('https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png')`}}></div>
    </div>
  )
}


function BtnGroup() {
  const buttonStyle = {
    fontWeight: 600,
  }

  return (
    <div className='btn-group'>
      <Link href='/signin'>
        <Button 
          className='sign-in-btn'
          size='small'
          variant="contained"
          sx={buttonStyle}
        >
          sign in
        </Button>
      </Link>

      <Button 
        className='github-btn'
        size='small'
        variant="contained"
        sx={buttonStyle}
        onClick={() => { window.location.href = 'https://github.com/huyhi/react-weather'}}
      >
        <OpenInNewIcon/> github
      </Button>
    </div>
  )
}

export default function Headbar() {
  return (
    <div className='headbar'>
      <div className='logo'></div>
      <LocationWeather />
      <BtnGroup/>
    </div>
  )
} 