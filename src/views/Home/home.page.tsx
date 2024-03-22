import { ReactElement, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import {selectMovies} from '../../store/movies/movies.slice';
import MovieResult from '../../components/MovieResult/movie-result.component';
import SearchSection from '../../components/SearchSection/search-section.component';
import { IMovie } from '../../models/movies';

function HomePage(): ReactElement {
  const [loadingMovie, setLoadingMovie] = useState<boolean>(false);
  const [movie, setMovie] = useState<IMovie | null>(null);

  return (
    <>
      <SearchSection isLoading={loadingMovie} />

      <MovieResult isLoading={loadingMovie} movie={movie} />
    </>
  );
}

export default HomePage;
