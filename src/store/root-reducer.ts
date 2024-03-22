import { combineReducers } from 'redux';
import moviesSlicer from './movies/movies-slicer';

const rootReducer = combineReducers({
  movies: moviesSlicer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
