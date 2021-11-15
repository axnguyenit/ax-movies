import React, { useEffect } from 'react';
import Banner from '../../components/banner';
import Header from '../../components/header';
import { MovieList } from '../../components/movies';
import { category, movieType, tvType } from '../../api/tmdbApi';

const Home = (props) => {
    useEffect(() => {
        document.title = 'Home - Ax Nguyen';
    }, []);
    return (
        <>
            <Banner />
            <div className="w-full mt-812:w-11/12 mx-auto">
                <MovieList
                    category={category.movie}
                    type={movieType.trending}
                    title="Trending Movies"
                />
                <MovieList
                    category={category.movie}
                    type={movieType.popular}
                    title="Popular Movies"
                />
                <MovieList
                    category={category.movie}
                    type={movieType.top_rated}
                    title="Top Rated Movies"
                />
                <MovieList
                    category={category.tv}
                    type={movieType.trending}
                    title="Trending TV"
                />
                <MovieList
                    category={category.tv}
                    type={movieType.popular}
                    title="Popular TV"
                />
                <MovieList
                    category={category.tv}
                    type={movieType.top_rated}
                    title="Top Rated TV"
                />
            </div>
        </>
    );
};

export default Home;
