import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import getCurrencyData from "../apis/currencyAPI";
import fallbackRatesData from "../fallbackData/fallbackRatesData.json";
import { getUserData, postUserData } from "../apis/userAPI";
import { setWallet } from "./walletSlice";

const initialRatesState = {
  userId: "btXtgk6g8rYXuejbuZaI",
  ratesList: [],
  baseCurrency: "",
  favouriteCodes: [],
  timeLastUpdated: null,
  timeNextUpdate: null,
  status: null,
};

// get user data
export const fetchUserData = createAsyncThunk(
  "rates/fetchUserData",

  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.rates.userId;

    const response = await getUserData(userId);
    console.log(response);

    if (response != null) {
      thunkAPI.dispatch(setWallet(response.wallet))
      return response;
    } else {
      console.warn("Error in retrieving data, using last saved data!");
      return thunkAPI.rejectWithValue(fallbackRatesData);
    }
  }
);

// get rates
export const fetchRatesData = createAsyncThunk(
  "rates/fetchRatesData",

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

// post user data
export const updateUserData = createAsyncThunk(
  "rates/updateUserData",

  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.rates.userId;
    const userData = {
      baseCurrency: state.rates.baseCurrency,
      favouriteCodes: state.rates.favouriteCodes
    };
    try {
      await postUserData(userId, userData);
    } catch (error) {
      console.error("Error updating user data");
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
    removeFromFavouriteCode: (state, action) => {
      state.favouriteCodes = state.favouriteCodes.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.baseCurrency = action.payload.baseCurrency;
        state.favouriteCodes = action.payload.favouriteCodes;
      })
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

export const { setRates, setBaseCurrency, addFavouriteCode, removeFromFavouriteCode } =
  ratesSlice.actions;

export default ratesSlice.reducer;
