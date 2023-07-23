import { useSelector } from "react-redux"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { OPEN_WEATHER_KEY } from '../api'
import { isEmptyObj } from '../common'
import '../styles/weather-map.css'
import 'leaflet/dist/leaflet.css';

function ChangeView( {searchCity} ) {
  const map = useMap()
  if (!isEmptyObj(searchCity)) {
    map.flyTo([searchCity.lat, searchCity.lon], 10)
  }
}


export default function WeatherMap() {

  const defaultLondonCoord = [51.507, -0.125]
  const defaultEuCoord = [51.592, 5.477]

  const searchCityG = useSelector(state => state.searchCityG)

  return (
    <div className='map-container'>
      <div className='map-title'>
        Rain Forecast Radar
      </div>
      <MapContainer id='map' center={ defaultEuCoord } zoom={4} scrollWheelZoom={false}>
        <ChangeView searchCity={searchCityG} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer 
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPEN_WEATHER_KEY}`}
        />
      </MapContainer>
    </div>
  )
}
