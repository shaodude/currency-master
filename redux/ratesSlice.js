import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialRatesState = {
  rates: [],
  baseCurrency: null,
  favourites: [],
};

const ratesSlice = createSlice({
  name: "rates",
  initialState: initialRatesState,
  reducers: {
    setRates: (state, action) => {
      state.rates = action.payload;
    },
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
  },
});

export const { setRates, setBaseCurrency } = ratesSlice.actions;

export default ratesSlice.reducer;
