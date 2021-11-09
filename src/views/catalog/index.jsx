import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CatalogHeader from '../../components/header/catalogHeader';
import { MovieGrid } from '../../components/movies';

const Catalog = (props) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div>
            <CatalogHeader
                category={pathname === '/movies' ? 'Movies' : 'TV Shows'}
            />
            <MovieGrid category={pathname === '/movies' ? 'movie' : 'tv'} />
        </div>
    );
};

export default Catalog;
