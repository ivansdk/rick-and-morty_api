import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

interface ThemeState {
  currentTheme: "light" | "dark";
}

const initialState: ThemeState = {
  currentTheme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload
    },
  },
});

export const { actions } = themeSlice; 
export default themeSlice.reducer;