import { configureStore } from '@reduxjs/toolkit';

import themeReducer from './slices/themeSlice';
import charactersSlice from './slices/charactersSlice';
import generalDataSlice from './slices/generalDataSlice';
import burgerMenuSlice from './slices/burgerMenuSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    characters: charactersSlice,
    generalData: generalDataSlice,
    burgerMenu: burgerMenuSlice,
  },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch