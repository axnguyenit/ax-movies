import React from 'react';

import background from '../../assets/images/background.jpg';

const Footer = (props) => {
    return (
        <div
            className="header__catalog h-64 bg-cover bg-center bg-no-repeat w-full"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute top-1/2 transform left-0 w-full z-10"></div>
        </div>
    );
};

export default Footer;
