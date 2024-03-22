import { combineReducers } from 'redux';
import favoritesSlice from './favorites/favorites.slice';
import moviesSlicer from './movies/movies.slice';

const rootReducer = combineReducers({
  movies: moviesSlicer,
  favorites: favoritesSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
