import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';


const store = configureStore({
    reducer: rootReducer,
  }, applyMiddleware(thunk));

export default store;
