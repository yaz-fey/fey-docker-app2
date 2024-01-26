import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import rocketsReducer from './rocketsReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  rockets: rocketsReducer
});

export default rootReducer;
