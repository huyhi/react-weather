import { useSelector, useDispatch } from "react-redux"

export default function WeatherInfo() {
  
  const searchCity = useSelector(state => state.searchCity_g)

  return (
    <>
      <div>
        { JSON.stringify(searchCity) }
      </div>
    </>
  )
}