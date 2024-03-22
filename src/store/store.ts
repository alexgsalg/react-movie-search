// import { compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

// const middlewares = [logger];
// const composedEnhencers = compose(applyMiddleware(...middlewares))

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export default store;
