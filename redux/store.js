import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from './ratesSlice';

const store = configureStore({
  reducer:  ratesReducer,
});

export default store;
