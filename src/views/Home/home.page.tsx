import { ReactElement, useState } from 'react';

import SearchSection from '../../components/SearchSection/search-section.component';

function HomePage(): ReactElement {
  const [loadingMovie, setLoadingMovie] = useState(false);

  return (
    <>
      <SearchSection isLoading={loadingMovie} />
    </>
  );
}

export default HomePage;
