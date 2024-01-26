const initialState = {
    weatherData: null,
    error: null
  };
  
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_WEATHER_SUCCESS':
        return { ...state, weatherData: action.payload };
      case 'FETCH_WEATHER_ERROR':
        return { ...state, error: action.error };
      default:
        return state;
    }
  };
  
  export default weatherReducer;
  