import { combineReducers } from "redux"

const searchCityReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SEARCHED_CITY':
      return action.payload
    default:
      return state
  }
}

const weatherInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WEATHER_INFO':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  searchCityG: searchCityReducer,
  weatherInfoG: weatherInfoReducer
})
