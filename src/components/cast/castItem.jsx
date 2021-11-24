import React from 'react';
import apiConfig from '../../api/apiConfig';

const CastItem = (props) => {
    const { cast } = props;
    const background = apiConfig.w500Image(cast.profile_path);
    return (
        <div className="relative movie__item h-44 bg-cover bg-center bg-no-repeat group duration-200 my-3 mx-3 shadow-lg hover:shadow-lg border-l-0 hover:border-l-4 border-red-600 overflow-hidden rounded-md">
            <div className="absolute flex top-0 left-0 w-full h-full">
                <img
                    src={background}
                    className="w-2/5 h-full object-cover"
                    alt=""
                />
                <div className="text-gray-300 h-full p-5">
                    <div className="line-6">
                        <h3 className="text-lg">{cast.name}</h3>
                        <h4 className="text-red-600 font-semibold">
                            {cast.character}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full overlay overlay-2" />
        </div>
    );
};

export default CastItem;
