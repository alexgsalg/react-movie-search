import { createAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { IMovie } from '../../models/movies';
import { ActionWithPayload } from '../store.utils';
import { MovieActionTypes } from './movies.interface';

export type AddMovie = ActionWithPayload<
  typeof MovieActionTypes.AddMovie,
  IMovie
>;
export type AddMovieFailure = ActionWithPayload<
  typeof MovieActionTypes.AddMovie,
  Error
>;

export type findMovie = Action<typeof MovieActionTypes.FindMovie>;
export type ResetMovies = Action<typeof MovieActionTypes.ResetMovies>;

const findMovie = createAction<string>('movies/findMovie');
const AddMovie = createAction<IMovie>('movies/addMovie');
const ResetMovies = createAction('movies/resetMovie');
