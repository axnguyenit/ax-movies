import React from 'react';
import { Link } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';

const BannerItem = ({ item }) => {
    const background = apiConfig.originalImage(
        item.backdrop_path ? item.backdrop_path : item.poster_path,
    );

    return (
        <div
            className="relative h-508 mt-812:h-700 bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full overlay overlay-7" />
            <div className="absolute top-0 left-0 w-full mt-16">
                <div className="mx-10 h-full flex">
                    <div className="w-full mt-812:w-1/2 block my-auto h-full text-gray-300 space-y-3">
                        <h2 className="text-4xl mt-812:text-5xl font-bold tracking-wide lg:leading-tight line-2 uppercase">
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
                        <div className="py-8 flex justify-between mt-414:justify-start mt-414:space-x-5 font-semibold tracking-wider uppercase">
                            <Link
                                to={`/movie/${item.id}/play`}
                                className="px-3 mt-350:px-2 py-2 mt-414:px-5 mt-414:py-4 inline-flex items-center bg-red-600 btn__primary mt-350:space-x-3"
                            >
                                <svg
                                    className="hidden mt-350:block"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    style={{ fill: '#D1D5DB' }}
                                >
                                    <path d="M7 6v12l10-6z"></path>
                                </svg>
                                <span className="pt-0.5">Play now</span>
                            </Link>

                            <Link
                                to="/"
                                className="px-3 mt-350:px-2 py-2 mt-414:px-5 mt-414:py-4 inline-flex items-center bg-blue-600 btn__primary mt-350:space-x-3"
                            >
                                <svg
                                    className="hidden mt-350:block"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    style={{ fill: '#D1D5DB' }}
                                >
                                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                                </svg>
                                <span className="pt-0.5">View Info</span>
                            </Link>
                        </div>
                    </div>
                    <div className="hidden mt-812:block mx-auto my-auto py-16">
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
