import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import apis from '../api'

const inputStyle = {
  width: '30em',
  backgroundColor: '#F8F8F8',
  borderRadius: '0.5em',
  // border: '0.4em solid #A1A1AA',
}

export default function SearchInput() {

  const [options, setOptions] = useState([])
  const [value, setValue] = useState('')

  const dispatch = useDispatch()
  const setSearchCityG = (data) => {return {type: 'SET_SEARCHED_CITY', payload: data}}

  const loadOptions = (searchText) => {
    apis
    .get('/city/lookup', {location: searchText, number: 5})
    .then((responseData) => {
      responseData.code === '200'
      &&
      setOptions(responseData.location.map((city) => {
        return {
          label: `${city.name},${city.adm1},${city.country}`,
          lat: city.lat,
          lon: city.lon,
        }
      }))
    })
  }

  return (
    <Autocomplete
      id="search-input"
      disablePortal
      value={value}
      options={options}
      sx={inputStyle}
      renderInput={(params) => {
        return <TextField {...params} label="Search your location"/>
      }}
      onChange={(event, selectedValue) => {
        // fetch weather data
        console.log('onChangeCall', event.target.value, selectedValue)
        dispatch(setSearchCityG(selectedValue))
      }}
      onInputChange={(event) => {
        event.target.value && loadOptions(event.target.value)
      }}
    />
  )
}