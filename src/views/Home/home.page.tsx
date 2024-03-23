import { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import lodash from 'lodash';
import MovieResult from '../../components/MovieResult/movie-result.component';
import SearchSection from '../../components/SearchSection/search-section.component';
import { IMovie, MovieSuggestion } from '../../models/movies';
import { fetchMovie, selectMovies } from '../../store/movies/movies.slice';
import { AppDispatch } from '../../store/store';

function HomePage(): ReactElement {
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie | null>(null);

  const moviesStored = useSelector(selectMovies);
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchMovie = async (movieSelected: MovieSuggestion) => {
    await dispatch(fetchMovie(movieSelected.Title))
      .then((movie) => {
        setMovie(movie.payload);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoadingMovie(false));
  };

  const debounceHandler = useCallback(
    lodash.debounce(handleFetchMovie, 300),
    []
  );

  // Functions
  const onFetchMovie = async (movieSelected: MovieSuggestion) => {
    setLoadingMovie(true);

    const movieStoredWithCurrentTitle =
      moviesStored.find((m) => {
        return m.imdbID === movieSelected.imdbID;
      }) || undefined;

    if (movieStoredWithCurrentTitle) {
      setLoadingMovie(false);
      return movieStoredWithCurrentTitle;
    } else {
      debounceHandler(movieSelected);
    }
  };

  return (
    <>
      <SearchSection isLoading={loadingMovie} fetchMovie={onFetchMovie} />

      {loadingMovie || movie ? (
        <MovieResult isLoading={loadingMovie} movie={movie} />
      ) : null}
    </>
  );
}

export default HomePage;
