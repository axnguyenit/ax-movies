import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CatalogHeader } from '../../components/header';
import { MovieGrid } from '../../components/movies';
import handleScrollToTop from '../../components/scrollToTop';

const Catalog = (props) => {
    const { category } = useParams();

    useEffect(() => {
        if (category === 'movies') {
            document.title = 'Movies - Ax Nguyen';
        } else {
            document.title = 'TV Shows - Ax Nguyen';
        }
        handleScrollToTop();
    }, [category]);

    return (
        <div>
            <CatalogHeader
                category={category === 'movies' ? 'Movies' : 'TV Shows'}
            />
            <MovieGrid category={category === 'movies' ? 'movie' : 'tv'} />
        </div>
    );
};

export default Catalog;
