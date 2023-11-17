import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Character } from "../../Types/Character";
import { getCharacters } from "../../api/api";

type Data = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

interface State {
  data: Data;
  loading: boolean;
  error: string;
}

const initialState: State = {
  data: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  },
  loading: false,
  error: "",
};

export const initCharacters = createAsyncThunk<
  Data,
  { page: number | string; status: string; species: string, name: string}
>("characters/fetch", async ({ page, status, species, name }) => {
  return getCharacters(page, status, species, name);
});

const themeSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initCharacters.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(initCharacters.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(initCharacters.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });
  },
});

export const { actions } = themeSlice;
export default themeSlice.reducer;
