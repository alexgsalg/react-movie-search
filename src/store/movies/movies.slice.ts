import {
  PayloadAction,
  SerializedError,
  asyncThunkCreator,
  buildCreateSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { IMovie } from '../../models/movies';
import { StoreStatus } from '../../models/store.model';
import { BASE_URL } from '../store.utils';

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

// export const fetchMovieByTitle = createAsyncThunk(
//   'movies/fetchMovieByTitle',
//   async (movieTitle: string) => {
//     try {
//       const response = await axios.get(`${BASE_URL}&plot=full&t=${movieTitle}`);
//       return response.data;
//     } catch (error: any) {
//       return error.message;
//     }
//   }
// );

export const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const moviesSlice = createSliceWithThunks({
  name: 'movies',
  initialState,
  reducers: (create) => ({
    addMovie: create.reducer<IMovie>((state, action: PayloadAction<IMovie>) => {
      state.movies = [...state.movies, action.payload];
    }),
    resetMovies: create.reducer<void>((state) => {
      state.movies = [];
    }),
    fetchMovie: create.asyncThunk(
      async (movieTitle: string) => {
        try {
          const response = await axios.get(
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
            state.movies.push(action.payload);
            state.error = null;
            state.currentRequestId = undefined;
          }
        },
      }
    ),
  }),
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchMovieByTitle.pending, (state, action) => {
  //       if (state.status === 'idle') {
  //         state.status = 'pending';
  //         state.currentRequestId = action.meta.requestId;
  //       }
  //     })
  //     .addCase(fetchMovieByTitle.fulfilled, (state, action) => {
  //       const { requestId } = action.meta;
  //       if (
  //         state.status === 'pending' &&
  //         state.currentRequestId === requestId
  //       ) {
  //         state.status = 'idle';
  //         state.movies.push(action.payload);
  //         state.error = null;
  //         state.currentRequestId = undefined;
  //       }
  //     })
  //     .addCase(fetchMovieByTitle.rejected, (state, action) => {
  //       const { requestId } = action.meta;
  //       if (
  //         state.status === 'pending' &&
  //         state.currentRequestId === requestId
  //       ) {
  //         state.status = 'idle';
  //         state.error = action.error;
  //         state.currentRequestId = undefined;
  //       }
  //     });
  // },
  selectors: {
    selectMovies: (sliceState) => sliceState.movies,
    selectMovieStatus: (sliceState) => sliceState.status,
    selectMoviesError: (sliceState) => sliceState.error,
  },
});

export const { addMovie, resetMovies } = moviesSlice.actions;
export const { selectMovies, selectMovieStatus, selectMoviesError } =
  moviesSlice.selectors;
export default moviesSlice.reducer;
