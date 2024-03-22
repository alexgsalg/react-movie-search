import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../../models/movies';

export interface MovieState {
  movies: IMovie[];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: MovieState = {
  movies: [],
  isLoading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<IMovie>) => {
      state.movies = [...state.movies, action.payload];
    },
    resetMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { addMovie, resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
