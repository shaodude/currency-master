import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from "./ratesSlice";
import walletReducer from "./walletSlice";

const store = configureStore({
  reducer: {
    rates: ratesReducer,
    wallet: walletReducer,
  },
});

export default store;
