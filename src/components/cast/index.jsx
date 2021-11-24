import React, { useEffect, useState } from 'react';
import CastItem from './castItem';
import PrevArrow from '../movies/prevArrow';
import NextArrow from '../movies/nextArrow';
import tmdbApi from '../../api/tmdbApi';
import { useParams } from 'react-router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Cast = () => {
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
            const params = {};
            const response = await tmdbApi.credits(category, id, { params });
            const castTemp = response.cast.filter((item) => {
                if (
                    item.profile_path &&
                    !item.character.toLowerCase().includes('uncredited')
                )
                    return item;
            });
            setCast(castTemp);
        };

        fetchCast();
    }, [category, id]);

    return (
        <div className="w-11/12 mx-auto">
            <h2 className="capitalize px-3 text-gray-300 text-3xl font-semibold tracking-wide">
                {`Cast (${cast.length})`}
            </h2>
            <div className="relative group">
                <Slider {...settings}>
                    {cast &&
                        cast.map((item, i) => <CastItem key={i} cast={item} />)}
                </Slider>
            </div>
        </div>
    );
};

export default Cast;
