import { ReactElement, useState } from 'react';

import MovieResult from '../../components/MovieResult/movie-result.component';
import SearchSection from '../../components/SearchSection/search-section.component';

function HomePage(): ReactElement {
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [movie, setMovie] = useState(null);

  return (
    <>
      <SearchSection isLoading={loadingMovie} />

      <MovieResult isLoading={loadingMovie} movie={movie} />
    </>
  );
}

export default HomePage;
