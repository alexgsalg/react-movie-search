import { Toast, ToastDomRef } from '@ui5/webcomponents-react';
import lodash from 'lodash';
import { ReactElement, useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// imports
import { IMovie, MovieSuggestion } from '../../models/movies';
// store
import {
  fetchMovie,
  selectMovies,
  selectMoviesError,
} from '../../store/movies/movies.slice';
import { AppDispatch } from '../../store/store';
// imports
import MovieResult from '../../components/MovieResult/movie-result.component';
import SearchSection from '../../components/SearchSection/search-section.component';

function HomePage(): ReactElement {
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const moviesStored = useSelector(selectMovies);
  const movieFetchError = useSelector(selectMoviesError);
  const dispatch = useDispatch<AppDispatch>();

  const toastRef = useRef<ToastDomRef | null>(null);

  // Functions
  const handleFetchMovie = async (movieSelected: MovieSuggestion) => {
    await dispatch(fetchMovie(movieSelected.Title))
      .then((movie) => {
        // if return as rejected
        if (movie.meta.requestStatus === 'rejected') {
          showToast(movieFetchError as string);
        }
        // if return as fulfilled
        setMovie(movie.payload);
      })
      .finally(() => setLoadingMovie(false));
  };

  const debounceHandler = useCallback(
    lodash.debounce(handleFetchMovie, 300),
    []
  );

  const onFetchMovie = async (movieSelected: MovieSuggestion) => {
    setLoadingMovie(true);

    const movieStoredWithCurrentTitle =
      moviesStored.find((m) => {
        return m.imdbID === movieSelected.imdbID;
      }) || undefined;

    console.log(
      'onFetchMovie > movieStoredWithCurrentTitle:',
      movieStoredWithCurrentTitle
    );
    if (movieStoredWithCurrentTitle) {
      setMovie(movieStoredWithCurrentTitle);
      setLoadingMovie(false);
    } else {
      debounceHandler(movieSelected);
    }
  };

  const showToast = (error: string) => {
    if (!toastRef) return;
    setErrorMsg(error);
    toastRef.current?.show();
  };

  return (
    <>
      <SearchSection isLoading={loadingMovie} fetchMovie={onFetchMovie} />

      {loadingMovie || movie?.imdbID ? (
        <MovieResult isLoading={loadingMovie} movie={movie} />
      ) : null}

      <Toast
        ref={toastRef}
        duration={3000}
        placement="TopEnd"
        className="toast_error">
        {errorMsg}
      </Toast>
    </>
  );
}

export default HomePage;
