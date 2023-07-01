'use client'
import Carousel from './components/carousel';
import WeatherInfo from './components/weather-info'
import { createStore } from 'redux'
import reducers from './reducer'
import { Provider } from 'react-redux';

// Redux 
// Store Action Reducer Dispath

let store = createStore(reducers)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(increment())

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Carousel />
        <WeatherInfo/>
      </Provider>
    </>
  )
}