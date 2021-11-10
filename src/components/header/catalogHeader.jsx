import React from 'react';

import background from '../../assets/images/background.jpg';

const CatalogHeader = (props) => {
    return (
        <div
            className="header__catalog mb-5 h-40 mt-568:h-56 mt-991:h-72 bg-cover bg-center bg-no-repeat w-full"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute top-1/2 transform left-0 w-full z-10">
                <h2 className="text-gray-300 tracking-wide text-center text-4xl font-semibold">
                    {props.category}
                </h2>
            </div>
        </div>
    );
};

export default CatalogHeader;
