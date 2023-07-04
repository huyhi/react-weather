'use-client';
import { MapContainer, TileLayer } from 'react-leaflet'
import { OPEN_WEATHER_KEY } from '../api'
import './weather-map.css'
import 'leaflet/dist/leaflet.css';

export default function WeatherMap() {
  
  const position = [50.905, 6.500]

  return (
    <div className='map-container'>
      <MapContainer id='map' center={position} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <TileLayer 
          url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPEN_WEATHER_KEY}`}
        />
        {/* <ImageOverlay></ImageOverlay> */}
      </MapContainer>
    </div>
  )
}
