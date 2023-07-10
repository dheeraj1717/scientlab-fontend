import { combineReducers } from 'redux';
import authReducer from './authReducer';
import deviceReducer from './deviceReducer';

// Import any other reducers you have

const rootReducer = combineReducers({
  auth: authReducer,
  devices: deviceReducer
  // Add other reducers here
});

export default rootReducer;
