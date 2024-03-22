import { createAction } from '@reduxjs/toolkit';
import { Action } from 'redux';
import { IMovie } from '../../models/movies';
import { ActionWithPayload } from '../store.utils';
import { FavoritesActionTypes } from './favorites.interface';

export type AddFavorite = ActionWithPayload<
  typeof FavoritesActionTypes.AddFavorite,
  IMovie
>;
export type RemoveFavorite = ActionWithPayload<
  typeof FavoritesActionTypes.RemoveFavorite,
  string
>;
export type ResetFavorites = Action<typeof FavoritesActionTypes.ResetFavorites>;

const AddFavorite = createAction<IMovie>('movies/addMovie');
const RemoveFavorite = createAction<string>('movies/RemoveFavorite');
const ResetFavorites = createAction('movies/resetMovie');
