import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWalletData, postWalletData } from "../apis/walletAPI";

const initialWalletState = {
  walletData: [],
  userId: "btXtgk6g8rYXuejbuZaI",
  status: "Initialised",
};

// get user data
export const fetchWalletData = createAsyncThunk(
  "wallet/fetchWalletData",

  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.wallet.userId;
    try {
      const response = await getWalletData(userId);
      return response;
    } catch (error) {
      console.error("Error fetching user data");
    }
  }
);

export const updateWalletData = createAsyncThunk(
  "wallet/updateWalletData",

  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.wallet.userId;
    const data = {
      wallet: state.wallet.walletData,
    };
    try {
      await postWalletData(userId, data);
    } catch (error) {
      console.error("Error updating wallet data");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: initialWalletState,
  reducers: {
    setWallet: (state, action) => {
      state.walletData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWalletData.fulfilled, (state, action) => {
      state.walletData = action.payload.wallet;
      state.status = "success";
    });
  },
});

export const { setWallet } = walletSlice.actions;

export default walletSlice.reducer;
