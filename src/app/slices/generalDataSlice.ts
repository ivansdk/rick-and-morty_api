import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCharacters, getEpisodes, getLocations } from "../../api/api";

type generalState = {
  character: {
    status: string,
    count: number,
  },

  location: {
    status: string,
    count: number,
  },

  episode: {
    status: string,
    count: number,
  },
};


const initialState: generalState = {
  character: {
    status: '',
    count: 0,
  },

  location: {
    status: '',
    count: 0,
  },

  episode: {
    status: '',
    count: 0,
  },
};

export const initCharacters = createAsyncThunk("generalData/fetchCharacters", () => {
  return getCharacters();
})

export const initLocations = createAsyncThunk("generalData/fetchLocations", () => {
  return getLocations();
})

export const initEpisodes = createAsyncThunk("generalData/fetchEpisodes", () => {
  return getEpisodes();
})

const generalDataSlice = createSlice({
  name: "generalData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initCharacters.pending, (state) => {
      state.character.status = 'loading';
    });

    builder.addCase(initCharacters.fulfilled, (state, action) => {
      state.character.count = action.payload.info.count;
      state.character.status = '';
    });

    builder.addCase(initCharacters.rejected, (state) => {
      state.character.status = 'error';
    });


    builder.addCase(initLocations.pending, (state) => {
      state.location.status = 'loading';
    });

    builder.addCase(initLocations.fulfilled, (state, action) => {
      state.location.count = action.payload.info.count;
      state.location.status = '';
    });

    builder.addCase(initLocations.rejected, (state) => {
      state.location.status = 'error';
    });


    builder.addCase(initEpisodes.pending, (state) => {
      state.episode.status = 'loading';
    });

    builder.addCase(initEpisodes.fulfilled, (state, action) => {
      state.episode.count = action.payload.info.count;
      state.episode.status = '';
    });

    builder.addCase(initEpisodes.rejected, (state) => {
      state.episode.status = 'error';
    });
  }
});

export const { actions } = generalDataSlice;
export default generalDataSlice.reducer;