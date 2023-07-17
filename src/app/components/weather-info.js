import { useSelector } from "react-redux"
import { useState } from "react";
import PropTypes from 'prop-types';
import './weather-info.css'
import { isEmptyObj, ts2ddFmtHour } from '../common'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography component={'div'}> {children} </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const DefaultPromotInfo = () => {
  return <div className="promot-info"> Please find your city in text area </div>
}

const CurrentWeather = () => {

  const weatherInfoG = useSelector(state => state.weatherInfoG)

  if (isEmptyObj(weatherInfoG)) {
    return <DefaultPromotInfo />
  }

  const cityLabel = weatherInfoG.cityLabel
  const cw = weatherInfoG.current

  return (
    <>
      <div className="cw-container">
        <div className="cw-headline"> 
          <LocationOnIcon/>
          <span className="cw-city-label"> {cityLabel} </span> 
        </div>

        <div className="cw">
          <div className="cw-main">
            <div>
              <div className="cw-icon" style={{backgroundImage: `url('https://openweathermap.org/img/wn/${cw.weather[0].icon}@4x.png')`}}> </div>
            </div>
            <div>
              <div className="degree-real"> <div> {Math.round(cw.temp)}°C </div> </div>
              <div className="degree-feel"> Feels like : <span> {cw.feels_like}°C </span> </div>
              <div className="cw-desc"> 
                { `${cw.weather[0].description[0].toUpperCase()}${cw.weather[0].description.slice(1)}` } 
              </div>
            </div>
          </div>

          <div className="cw-attr">
            <div> 
              <p> <span className="cw-attr-name"> UV index : </span> {cw.uvi} </p> 
            </div>  {/* https://en.wikipedia.org/wiki/Ultraviolet_index */}
            <div> 
              <p> <span className="cw-attr-name"> Humidity : </span> {cw.humidity}% </p> 
            </div>
            <div> 
              <p> <span className="cw-attr-name"> Pressure : </span> {cw.pressure} hPa </p>
            </div>
            <div> 
              <p> <span className="cw-attr-name"> Wind : </span> {cw.wind_speed}km/h </p> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


const HourlyWeather = () => {

  const weatherInfoG = useSelector(state => state.weatherInfoG)

  if (isEmptyObj(weatherInfoG)) {
    return <DefaultPromotInfo />
  }

  console.log(weatherInfoG)

  return (
    <div className="hourly-weather-container">
      <div className="hourly-weather-title">
        24 hours weather forecast
      </div>
      <div className="hourly-weather">
      {
        weatherInfoG.hourly.slice(0, 24).map((item, idx) => 
          (
          <div className="hourly-weather-item" key={idx}>
            <div> 
              {idx === 0 ? 'now' : ts2ddFmtHour(item.dt * 1000)}
            </div>
            <div 
              className="hourly-weather-icon"
              style={{backgroundImage: `url("https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png")`}}>
            </div>
            <div> {Math.round(item.temp)}°</div>
          </div>
          )
        )
      }
      </div>
    </div>
  )
}


export default function WeatherInfo() {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="weather-info-container">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="CURRENTLY" />
              <Tab label="HOURLY" />
              <Tab label="DAILY" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CurrentWeather/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <HourlyWeather/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className="promot-info"> Coming Soon </div>
          </TabPanel>
        </Box>
      </div>
    </>
  )
}