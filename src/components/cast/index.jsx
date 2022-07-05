import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import CastItem from './CastItem';
import { PrevArrow } from '../../modules/movies';
import { NextArrow } from '../../modules/movies';
// api
import { tmdbApi } from '../../api';

// ----------------------------------------------------------------------

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { category, id } = useParams();
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
    const fetchCast = async () => {
      try {
        const params = {};
        const { cast } = await tmdbApi.credits(category, id, { params });
        const castTemp = cast.filter((item) => {
          if (item.profile_path && !item.character.toLowerCase().includes('uncredited'))
            return item;
          // eslint-disable-next-line array-callback-return
          return;
        });
        setCast(castTemp);
      } catch (error) {}
    };

    fetchCast();
  }, [category, id]);

  return (
    <>
      {cast && cast.length > 0 && (
        <div className="w-11/12 mx-auto">
          <div className="block -mx-3">
            <h2 className="capitalize px-3 text-gray-300 mt-812:text-3xl text-2xl font-semibold tracking-wide">
              {`Cast (${cast.length})`}
            </h2>
            {cast && cast.length > 4 ? (
              <div className="relative group">
                <Slider {...settings}>
                  {cast && cast.map((item, i) => <CastItem key={i} cast={item} />)}
                </Slider>
              </div>
            ) : (
              <div
                id="movie__grid"
                className="grid grid-cols-1 mt-568:grid-cols-2 mt-812:grid-cols-3 mt-1280:grid-cols-4 mt-1700:grid-cols-5 gap-0 min-h-full"
              >
                {cast && cast.map((item, i) => <CastItem key={i} cast={item} />)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
