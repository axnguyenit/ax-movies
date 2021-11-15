import React, { useState, useEffect } from 'react';
import MovieItem from './movieItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

const NextArrow = (props) => (
    <div
        onClick={props.onClick}
        className="mt-1024:opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 right-2.5 w-10 h-20 flex items-center justify-center cursor-pointer hover:opacity-70 duration-300 bg-penetration-5"
    >
        <svg
            width="150"
            height="150"
            viewBox="0 0 24 24"
            style={{ fill: '#d1d5db' }}
        >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
        </svg>
    </div>
);

const PrevArrow = (props) => (
    <div
        onClick={props.onClick}
        className="mt-1024:opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 left-3 w-10 h-20 flex items-center justify-center cursor-pointer hover:opacity-70 duration-300 bg-penetration-5"
    >
        <svg
            width="150"
            height="150"
            viewBox="0 0 24 24"
            style={{ fill: '#d1d5db' }}
        >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
        </svg>
    </div>
);

const MovieList = (props) => {
    const [movies, setMovies] = useState([]);

    const settings = {
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        centerPadding: 0,
        swipeToSlide: true,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
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
            <h2 className="capitalize px-3 text-gray-300 text-3xl font-semibold tracking-wide">
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
