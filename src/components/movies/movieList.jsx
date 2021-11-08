import React, { useState, useEffect } from 'react';
import MovieItem from './movieItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

const MovieList = (props) => {
    const [movies, setMovies] = useState([]);

    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: 0,
        swipeToSlide: true,
        pauseOnHover: true,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
    };

    useEffect(() => {
        const getList = async () => {
            let response = null;
            const params = {};

            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        if (props.type === movieType.trending) {
                            response = await tmdbApi.getTrendingList(
                                props.category,
                                { params },
                            );
                        } else {
                            response = await tmdbApi.getMoviesList(props.type, {
                                params,
                            });
                        }
                        break;
                    default:
                        if (props.type === tvType.trending) {
                            response = await tmdbApi.getTrendingList(
                                props.category,
                                { params },
                            );
                        } else {
                            response = await tmdbApi.getTvList(props.type, {
                                params,
                            });
                        }
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            // console.log('====================================');
            // console.log(response.results);
            // console.log('====================================');
            setMovies(response.results);
        };
        getList();
    }, []);

    return (
        <div className="py-5">
            <h2 className="capitalize text-gray-300 text-3xl font-semibold tracking-wide">
                {props.title}
            </h2>
            <Slider {...settings}>
                {movies &&
                    movies.map((item, i) => <MovieItem key={i} item={item} />)}
            </Slider>
        </div>
    );
};

export default MovieList;
