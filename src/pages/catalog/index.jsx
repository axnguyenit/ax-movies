import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// components
import Page from '../../components/page';
import { CatalogBanner } from '../../components/banner';
import { MovieGrid } from '../../modules/movies';
// utils
import { handleScrollToTop } from '../../utils';

// ----------------------------------------------------------------------

export default function Catalog() {
  const { category } = useParams();
  const isMovie = category === 'movies';

  useEffect(() => {
    handleScrollToTop();
  }, [category]);

  return (
    <Page title={isMovie ? 'Movies' : 'TV Shows'}>
      <CatalogBanner category={isMovie ? 'Movies' : 'TV Shows'} />
      <MovieGrid category={isMovie ? 'movie' : 'tv'} />
    </Page>
  );
};
