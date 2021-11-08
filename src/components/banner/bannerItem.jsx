import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';

const BannerItem = ({ item }) => {
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path,
    );

    return (
        <div
            className="relative h-banner bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full overlay overlay-7" />
            <div className="absolute top-0 left-0 w-full mt-16">
                <div className="mx-10 h-full flex">
                    <div className="w-1/2 block my-auto h-full text-gray-300 space-y-3">
                        <h2 className="text-5xl font-bold tracking-wide lg:leading-tight line-2 uppercase">
                            {item.title}
                        </h2>
                        <div className="text-base mb-10 mt-2 line-2 space-x-4">
                            <span>{item.vote_average}/10</span>
                            <span>&bull;</span>
                            <span>{item.release_date.slice(0, 4)}</span>
                        </div>

                        <p className="line-5 text-lg leading-7">
                            {item.overview}
                        </p>
                        <div className="py-8 space-x-5 font-semibold tracking-wider uppercase">
                            <Link
                                to="/"
                                className="px-5 py-4 bg-red-600 btn__primary"
                            >
                                Play now
                            </Link>

                            <Link
                                to="/"
                                className="px-5 py-4 bg-blue-600 btn__primary"
                            >
                                View Info
                            </Link>
                        </div>
                    </div>
                    <div className="block mx-auto my-auto py-16">
                        <img
                            src={apiConfig.w500Image(item.poster_path)}
                            className="h-380 w-auto object-cover my-auto"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BannerItem;
