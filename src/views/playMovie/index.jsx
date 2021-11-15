import React, { useEffect, useRef, useState } from 'react';
import Video from '../../components/video';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { MovieList } from '../../components/movies';
import { Season } from '../../components/tvSeasons';
import { embedMovie, embedEpisode } from '../../api/embed';
import Overview from '../../components/overview';
import handleScrollToTop from '../../components/scrollToTop';

const PlayMovie = (props) => {
    const { category, id } = useParams();
    const otherRef = useRef(null);
    const [background, setBackground] = useState('');
    const [src, setSrc] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [title, setTitle] = useState([]);
    const [overview, setOverview] = useState({});

    const fetchMovie = async () => {
        const params = {};
        const response = await tmdbApi.detail(category, id, { params });
        if (category === 'tv') {
            setSeasons(response.seasons);
            setOverview(response);
        } else {
            setOverview(response);
            const responseList = await tmdbApi.getTrendingList(category, {
                params,
            });
            setSeasons(responseList.results);
        }
        const backgroundTemp = response.backdrop_path
            ? response.backdrop_path
            : response.poster_path;
        setBackground(backgroundTemp);

        const titleTemp = response.title ? response.title : response.name;
        document.title = `${titleTemp} - Ax Nguyen`;
        setTitle(titleTemp);
    };

    const handleUrl = (season = 1, episode = overview) => {
        if (category === 'movie') {
            setSrc(embedMovie(id));
        } else {
            setOverview(episode);
            if (episode.episode_number) {
                setSrc(embedEpisode(id, season, episode.episode_number));
            } else {
                setSrc(embedEpisode(id, season, 1));
            }
        }
        handleScrollToTop();
    };

    const handleBackground = (movie) => {
        return movie.backdrop_path ? movie.backdrop_path : movie.poster_path;
    };

    useEffect(() => {
        fetchMovie();
        handleUrl();
        handleScrollToTop();
    }, [id]);

    return (
        <div
            className="bg__play w-full bg-cover bg-no-repeat bg-center pt-24 mt-812:pb-10"
            style={{
                backgroundImage: `url(${apiConfig.originalImage(background)})`,
            }}
        >
            <div className="w-full mt-812:px-0 px-3 mt-812:w-11/12 mx-auto">
                <div className="flex mt-812:flex-row flex-col mt-812:space-x-5">
                    <div className="w-full mt-812:w-2/3 mb-5 mt-812:mb-0">
                        <Video src={src} />
                        <Overview title={title} overview={overview} />
                    </div>

                    <div className="w-full mt-812:w-1/3 z-10" ref={otherRef}>
                        <div className="text-gray-300 text-2xl mb-2">
                            {category === 'tv'
                                ? 'Other Episodes'
                                : 'Trending Movies'}
                        </div>
                        <div className=" h-700 overflow-y-auto scroll__custom">
                            {seasons &&
                                seasons.map((season) => {
                                    return (
                                        <Season
                                            key={season.id}
                                            season={season}
                                            background={
                                                background ||
                                                handleBackground(season)
                                            }
                                            handleUrl={handleUrl}
                                            category={category}
                                            id={id}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <div className="relative z-10">
                    <MovieList
                        category={category}
                        type="similar"
                        title="Similar"
                        id={id}
                    />
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default PlayMovie;
