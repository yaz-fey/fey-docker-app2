import axios from 'axios';

// Roket verilerini çekmek için action
export const fetchRockets = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:5000/rockets', {
      headers: {
        'x-api-key': 'API_KEY_1' 
      }
    });
    dispatch({ type: 'FETCH_ROCKETS_SUCCESS', payload: response.data });
  } catch (error) {
    console.error("API hatası:", error);
    dispatch({ type: 'FETCH_ROCKETS_ERROR', error });
  }
};


