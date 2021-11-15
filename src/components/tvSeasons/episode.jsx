import React from 'react';
import apiConfig from '../../api/apiConfig';

const Episode = (props) => {
    const { seasonNumber, episode, handleUrl, background } = props;
    const bg = episode.still_path ? episode.still_path : '';
    const backgroundTemp = bg ? bg : background;
    return (
        <div
            className="flex cursor-pointer my-2 bg-penetration-5 hover:bg-penetration-7 duration-200 group"
            onClick={() => handleUrl(seasonNumber, episode)}
        >
            <div className="overflow-hidden w-1/3">
                <img
                    src={apiConfig.w200Image(backgroundTemp)}
                    className="block w-full h-16 mt-812:h-20 object-cover transform group-hover:scale-110 duration-200"
                    alt=""
                />
            </div>

            <div className="text-gray-300 w-2/3 group-hover:text-red-600 duration-200">
                <h3 className="line-2 h-full p-3 text-sm break-words">
                    {episode.name}
                </h3>
            </div>
        </div>
    );
};

export default Episode;
