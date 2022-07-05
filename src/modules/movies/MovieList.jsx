import React, { useState, useEffect } from 'react';
// components
import MovieItem from './MovieItem';
import Slider from 'react-slick';
import PrevArrow from './PrevArrow';
import NextArrow from './NextArrow';
import Preloader from '../../components/preloader';
// api
import { tmdbApi, category, movieType, tvType } from '../../api';

// ----------------------------------------------------------------------

export default function MovieList({ type, category: _category, title, id }) {
  const [movies, setMovies] = useState([]);
  const [preloader, setPreloader] = useState(true);

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

      try {
        if (type !== 'similar') {
          switch (_category) {
            case category.movie:
              if (type === movieType.trending) {
                response = await tmdbApi.getTrendingList(_category, {
                  params,
                });
              } else {
                response = await tmdbApi.getMoviesList(type, {
                  params,
                });
              }
              break;
            default:
              if (type === tvType.trending) {
                response = await tmdbApi.getTrendingList(_category, {
                  params,
                });
              } else {
                response = await tmdbApi.getTvList(type, {
                  params,
                });
              }
              break;
          }
        } else {
          response = await tmdbApi.similar(_category, id);
        }
      } catch (error) {}
      setMovies(response.results);
      setPreloader(false);
    };
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (preloader) return <Preloader />;

  return (
    <div className="py-5">
      <h2 className="capitalize px-3 text-gray-300 mt-812:text-3xl text-2xl font-semibold tracking-wide">
        {title}
      </h2>
      <div className="relative group">
        <Slider {...settings}>
          {movies &&
            movies.map((item, i) => (
              <MovieItem key={i} item={item} category={_category} />
            ))}
        </Slider>
      </div>
    </div>
  );
}
