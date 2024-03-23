import {
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';

import { IMovie } from '../../models/movies';
import { StoreStatus } from '../../models/store.model';
import { BASE_URL } from '../../service/http.service';

export interface MovieState {
  movies: IMovie[];
  currentMovie: string | undefined;
  currentRequestId: string | undefined;
  status: StoreStatus;
  error: SerializedError | null;
}

export const initialState: MovieState = {
  movies: [],
  currentMovie: undefined,
  currentRequestId: undefined,
  status: 'idle',
  error: null,
};

export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const moviesSlice = createSliceWithThunks({
  name: 'movies',
  initialState,
  reducers: (create) => ({
    fetchMovie: create.asyncThunk(
      async (movieTitle: string) => {
        try {
          const response: AxiosResponse<any, any> = await axios.get(
            `${BASE_URL}&plot=full&t=${movieTitle}`
          );
          return response.data;
        } catch (error: any) {
          return error.message;
        }
      },
      {
        pending: (state, action) => {
          if (state.status === 'idle') {
            state.status = 'pending';
            state.currentRequestId = action.meta.requestId;
          }
        },
        rejected: (state, action) => {
          const { requestId } = action.meta;
          if (
            state.status === 'pending' &&
            state.currentRequestId === requestId
          ) {
            state.status = 'idle';
            state.error = action.error;
            state.currentRequestId = undefined;
          }
        },
        fulfilled: (state, action) => {
          const { requestId } = action.meta;
          if (
            state.status === 'pending' &&
            state.currentRequestId === requestId
          ) {
            state.status = 'idle';
            const isStored =
              state.movies.some((m) => {
                return (
                  m.Title.toLowerCase() === action.payload.Title.toLowerCase()
                );
              }) || undefined;
            if (!isStored) state.movies.push(action.payload);
            state.error = null;
            state.currentRequestId = undefined;
          }
        },
      }
    ),
    resetMovies: create.reducer<void>((state) => {
      state.movies = [];
    }),
  }),
  selectors: {
    selectMovies: (sliceState) => sliceState.movies,
    selectMovieStatus: (sliceState) => sliceState.status,
    selectMoviesError: (sliceState) => sliceState.error,
  },
});

export const { fetchMovie, resetMovies } = moviesSlice.actions;
export const { selectMovies, selectMovieStatus, selectMoviesError } =
  moviesSlice.selectors;
export default moviesSlice.reducer;
