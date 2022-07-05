import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import BannerItem from '../banner/BannerItem';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
// api
import { tmdbApi, movieType } from '../../api';

// ----------------------------------------------------------------------

export default function HomeBanner() {
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
      try {
        const params = { page: 1 };
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params,
        });
        setMovies(response.results.slice(1, 4));
      } catch (error) {}
    };
    getMovies();
  }, []);

  return (
    <div className="mb-10 group banner">
      <Slider {...settings}>
        {movies.map((item, i) => (
          <BannerItem key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
}
