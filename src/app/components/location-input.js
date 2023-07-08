import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { apis, Q_WEATHER_HOST, OPEN_WEATHER_HOST } from '../api'
import { debounce } from '../common';

const inputStyle = {
  width: '55%',
  minWidth: '15em',
  backgroundColor: '#F8F8F8',
  borderRadius: '0.5em',
}

export default function SearchInput() {

  const [options, setOptions] = useState([])
  const [value, setValue] = useState('')

  const debounceCached = useCallback(debounce, [])

  const dispatch = useDispatch()
  const setSearchCityG = (data) => {return {type: 'SET_SEARCHED_CITY', payload: data}}
  const setWeatherInfoG = (data) => {return {type: 'SET_WEATHER_INFO', payload: data}}

  const loadOptions = (searchText) => {
    if (!searchText) {
      return
    }
    apis
    .get(Q_WEATHER_HOST, '/city/lookup', {location: searchText, number: 5})
    .then((responseData) => {
      responseData.code === '200'
      &&
      setOptions(responseData.location.map((city) => {
        return {
          label: `${city.name}, ${city.adm1}, ${city.country}`,
          lat: city.lat,
          lon: city.lon,
        }
      }))
    })
  }

  const fetchWeatherData = (cityInfo) => {
    apis
    .get(OPEN_WEATHER_HOST, '/onecall', {
      lat: cityInfo.lat,
      lon: cityInfo.lon,
      units: 'metric'
    })
    .then((responseData) => {
      if (responseData.code !== undefined) {
        console.log(`fetch weather data error ${responseData}`)
        return
      }
      responseData.cityLabel = cityInfo.label
      dispatch(setWeatherInfoG(responseData))
    })
  }

  return (
    <Autocomplete
      id="search-input"
      disablePortal
      value={value}
      options={options}
      sx={inputStyle}
      renderInput={(props) => {
        return <TextField {...props} label="Search your location (at least 2 letters)"/>
      }}
      renderOption={(props, option) => {
        return (<div {...props} key={option.label}> {option.label} </div>)
      }}
      onChange={(event, selected) => {
        if (selected === null) {
          return
        }
        setValue(selected.label)
        dispatch(setSearchCityG(selected))
        fetchWeatherData(selected)
      }}
      onInputChange={
        debounceCached((event) => {loadOptions(event.target.value)}, 450)
      }
    />
  )
}