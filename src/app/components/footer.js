import '../styles/footer.css'

export default function Footer() {
  return (
    <div className="footer">
      <div> Weather data based on <a href='https://openweathermap.org/'>OpenWeatherMap</a> </div>
      <div> View source code on my <a href='https://github.com/huyhi/react-weather'> Github </a> </div>
      <div> &copy; react-weather.hongye-an.co.uk Author: Hongye An </div>
    </div>
  )
}