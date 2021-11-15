import React, { useEffect, useRef, useState } from 'react';
import tmdbApi from '../../api/tmdbApi';
import Episode from './episode';
import apiConfig from '../../api/apiConfig';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

const Season = (props) => {
    const episodeRef = useRef(null);
    const navigate = useNavigate();
    const { season, handleUrl, poster, id, background } = props;
    const { category } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const fetchEpisode = async () => {
        const response = await tmdbApi.getTVSeasons(id, season.season_number);
        setEpisodes(response.episodes);
    };

    const handleSeason = () => {
        if (category === 'movie') {
            navigate(`/movie/${season.id}/play`);
        } else {
            episodeRef.current.classList.toggle('h-0');
        }
    };

    const bgMovie = season.backdrop_path
        ? season.backdrop_path
        : season.poster_path;

    useEffect(() => {
        if (category === 'tv') {
            fetchEpisode();
        }
    }, [id, season]);

    return (
        <div>
            <div
                onClick={handleSeason}
                className="relative flex text-gray-300 bg-penetration-7 group cursor-pointer group my-1"
            >
                <div className="overflow-hidden w-1/3">
                    <img
                        src={apiConfig.w200Image(
                            bgMovie ? bgMovie : background,
                        )}
                        alt=""
                        className="w-full transform duration-200 h-16 mt-812:h-20 object-cover group-hover:scale-110"
                    />
                </div>

                <div className="w-2/3">
                    <h2 className="flex items-center duration-200 group-hover:text-red-600 px-3 h-full">
                        {season.name || season.title}
                    </h2>
                </div>

                <div className="absolute top-1/2 transform -translate-y-1/2 right-3 flex items-center">
                    <svg
                        width="20"
                        height="20"
                        className="ml-0 transform duration-200 -translate-x-3 group-hover:translate-x-0"
                        viewBox="0 0 24 24"
                        style={{ fill: '#D1D5DB' }}
                    >
                        <path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path>
                    </svg>
                </div>
            </div>
            <div ref={episodeRef} className="h-0 overflow-hidden duration-300">
                {episodes &&
                    episodes.map((episode) => (
                        <Episode
                            key={episode.id}
                            episode={episode}
                            background={background}
                            seasonNumber={season.season_number}
                            handleUrl={handleUrl}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Season;
