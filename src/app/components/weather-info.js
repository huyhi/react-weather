import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import PropTypes from 'prop-types';
import './weather-info.css'
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
          <Typography>{children}</Typography>
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

const CurrentWeather = () => {

  const searchCity = useSelector(state => state.searchCity_g)

  // console.log('CurrentWeather called')

  return (
    <>
      <div className="cw-container">
        <div className="cw-headline"> 
          <span className="cw-desc"> Overcast Clouds </span>
          <LocationOnIcon/>
          <span className="cw-city-label"> City of London, England, UK </span> 
        </div>

        <div className="cw">
          <div className="cw-main">
            <div className="cw-icon" style={{backgroundImage: "url('https://openweathermap.org/img/wn/10d@4x.png')"}}> </div>
            <div>
              <div className="degree-real"> <div> 32°C </div> </div>
              <div className="degree-feel"> Feels like : <span> 12°C </span> </div>
            </div>
          </div>

          <div className="cw-attr">
            <div> 
              <p> <span className="cw-attr-name"> UV index : </span> 0 </p> 
            </div>  {/* https://en.wikipedia.org/wiki/Ultraviolet_index */}
            <div> 
              <p> <span className="cw-attr-name"> Humidity : </span> 80% </p> 
            </div>
            <div> 
              <p> <span className="cw-attr-name"> Pressure : </span> 1080 mb </p>
            </div>
            <div> 
              <p> <span className="cw-attr-name"> Wind : </span> 12km/h </p> 
            </div>
          </div>
        </div>
      </div>
    </>
  )
  // return <> 123 </>
}


export default function WeatherInfo() {
  
  const searchCity = useSelector(state => state.searchCity_g)

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
            TabPanel Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            TabPanel Item Three
          </TabPanel>
        </Box>
      </div>
    </>
  )
}