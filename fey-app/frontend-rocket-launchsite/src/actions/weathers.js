import axios from 'axios';

export const fetchWeather = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5000/weather', {
      headers: { 'x-api-key': 'API_KEY_1' } 
    });
    dispatch({ type: 'FETCH_WEATHER_SUCCESS', payload: response.data });
  } catch (error) {
    console.error("Hava durumu API hatası:", error);
    dispatch({ type: 'FETCH_WEATHER_ERROR', error });
  }
};
