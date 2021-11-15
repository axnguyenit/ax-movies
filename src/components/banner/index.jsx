import React, { useState, useEffect } from 'react';
import BannerItem from './bannerItem';
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './nextArrow';
import PrevArrow from './prevArrow';

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
