import React, { useState, useEffect } from 'react';
import MovieItem from './movieItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import PrevArrow from './prevArrow';
import NextArrow from './nextArrow';

const MovieList = (props) => {
    const [movies, setMovies] = useState([]);

    const settings = {
        infinite: true,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        centerPadding: 0,
        swipeToSlide: true,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 813,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
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
                        break;
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id);
            }
            setMovies(response.results);
        };
        getList();
    }, [props.id]);

    return (
        <div className="py-5">
            <h2 className="capitalize px-3 text-gray-300 mt-812:text-3xl text-2xl font-semibold tracking-wide">
                {props.title}
            </h2>
            <div className="relative group">
                <Slider {...settings}>
                    {movies &&
                        movies.map((item, i) => (
                            <MovieItem
                                key={i}
                                item={item}
                                category={props.category}
                            />
                        ))}
                </Slider>
            </div>
        </div>
    );
};

export default MovieList;
