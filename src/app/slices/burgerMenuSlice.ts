import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface burgerMenuState {
  menuStatus: boolean;
}

const initialState: burgerMenuState = {
  menuStatus: false,
};


const burgerMenuSlice = createSlice({
  name: "burgerMenu",
  initialState,
  reducers: {
    menuStatus: (state, action: PayloadAction<boolean>) => {
      state.menuStatus = action.payload
    },
  },
});

export const { actions } = burgerMenuSlice; 
export default burgerMenuSlice.reducer;