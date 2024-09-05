import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { postWalletData } from "../apis/walletAPI";

const initialWalletState = {
  walletData: [],
  userId: "btXtgk6g8rYXuejbuZaI",
  status: "",
};

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

    addToWallet: (state, action) => {
      state.walletData = [...state.walletData, action.payload];
    },

    removeFromWallet: (state, action) => {
      state.walletData = state.walletData.filter(
        (item) => item.code !== action.payload
      );
    },

    editWallet: (state, action) => {
      state.walletData = state.walletData.map((item) =>
        item.code === action.payload.code ? { ...item, ...action.payload } : item
      );
    },
  },
});

export const { setWallet, addToWallet, removeFromWallet, editWallet } = walletSlice.actions;

export default walletSlice.reducer;
