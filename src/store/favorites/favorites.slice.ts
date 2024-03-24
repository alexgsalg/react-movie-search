import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface
import { IMovie } from '../../models/movies';

export interface FavoriteState {
  favorites: IMovie[];
}

export const initialState: FavoriteState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<IMovie>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite.imdbID !== action.payload
      );
    },
    resetFavorites: (state) => {
      state.favorites = [];
    },
  },
  selectors: {
    selectFavorites: (sliceState) => sliceState.favorites,
  },
});

export const { addFavorite, removeFavorite, resetFavorites } =
  favoritesSlice.actions;
export const { selectFavorites } = favoritesSlice.selectors;

export default favoritesSlice.reducer;
