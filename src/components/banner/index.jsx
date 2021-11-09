import React, { useState, useEffect } from 'react';
import BannerItem from './bannerItem';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props) => (
    <div
        onClick={props.onClick}
        className="opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 right-2 w-10 h-10 flex items-center justify-center rounded-full group cursor-pointer hover:opacity-70 duration-300"
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
        className="opacity-0 group-hover:opacity-100 absolute top-1/2 z-10 transform -translate-y-1/2 left-2 w-10 h-10 flex items-center justify-center rounded-full group cursor-pointer hover:opacity-70 duration-300"
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

const Banner = (props) => {
    const [movies, setMovies] = useState([]);
    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: 0,
        swipeToSlide: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 };
            try {
                const response = await tmdbApi.getMoviesList(
                    movieType.popular,
                    { params },
                );
                setMovies(response.results.slice(1, 4));
            } catch {
                console.log('error');
            }
        };
        getMovies();
    }, []);
    return (
        <div className="mb-10 group">
            <Slider {...settings}>
                {movies.map((item, i) => (
                    <BannerItem key={i} item={item} />
                ))}
            </Slider>
        </div>
    );
};

export default Banner;
