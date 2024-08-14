import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import getCurrencyData from "../apis/currencyAPI";
import fallbackRatesData from "../fallbackData/fallbackRatesData.json";

const initialRatesState = {
  ratesList: [],
  baseCurrency: "USD",
  favouriteCodes: ["USD", "SGD", "EUR", "AED"],
  timeLastUpdated: null,
  timeNextUpdate: null,
  status: null,
};

// get user data
export const fetchRatesData = createAsyncThunk(
  "rates/getRatesData",

  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const baseCurrency = state.rates.baseCurrency;
    try {
      const response = await getCurrencyData(baseCurrency);

      if (response.result === "success") {
        return response;
      } else {
        console.warn("Error in retrieving data, using last saved data!");
        return thunkAPI.rejectWithValue(fallbackRatesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return thunkAPI.rejectWithValue(fallbackRatesData);
    }
  }
);

const ratesSlice = createSlice({
  name: "rates",
  initialState: initialRatesState,
  reducers: {
    setRatesList: (state, action) => {
      state.ratesList = action.payload;
    },
    setBaseCurrency: (state, action) => {
      state.baseCurrency = action.payload;
    },
    addFavouriteCode: (state, action) => {
      state.favouriteCodes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRatesData.fulfilled, (state, action) => {
        const ratesArray = Object.entries(action.payload.rates).map(
          ([code, rate]) => {
            return { code, rate };
          }
        );
        state.ratesList = ratesArray;
        state.timeLastUpdated = action.payload.time_last_update_unix;
        state.timeNextUpdate = action.payload.time_next_update_unix;
        state.status = "success";
      })
      .addCase(fetchRatesData.rejected, (state, action) => {
        const ratesArray = Object.entries(action.payload.rates).map(
          ([code, rate]) => {
            return { code, rate };
          }
        );
        state.ratesList = ratesArray;
        state.timeLastUpdated = action.payload.time_last_update_unix;
        state.timeNextUpdate = action.payload.time_next_update_unix;
        state.status = "error";
        state.baseCurrency = action.payload.base_code;
      });
  },
});

export const { setRates, setBaseCurrency, addFavouriteCode } =
  ratesSlice.actions;

export default ratesSlice.reducer;
