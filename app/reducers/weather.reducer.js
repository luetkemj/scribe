import {
  LOADING_WEATHER_INITIATED,
  WEATHER_ALREADY_LOADED,
  LOADING_WEATHER_SUCCESS,
  LOADING_WEATHER_ERROR,
} from '../constants/action-types';

const initialState = {
  loading: false,
  error: null,
  weather: [],
};

export default function WeatherReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_WEATHER_INITIATED:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      });
    case WEATHER_ALREADY_LOADED:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      });
    case LOADING_WEATHER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        weather: action.weather,
      });
    case LOADING_WEATHER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      });
    default:
      return state;
  }
}
