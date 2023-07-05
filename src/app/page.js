'use client'
import Carousel from './components/carousel'
import WeatherInfo from './components/weather-info'
import dynamic from 'next/dynamic'
import { createStore } from 'redux'
import reducers from './reducer'
import { Provider } from 'react-redux'
import styles from './page.module.css'

// Redux 
// Store Action Reducer Dispath
let store = createStore(reducers)

const WeatherMap = dynamic(
  () => import('./components/weather-map'),
  {ssr: false}
)

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Carousel />
        <div className={styles.main}>
          <WeatherMap />
          <WeatherInfo />
        </div>
      </Provider>
    </>
  )
}
