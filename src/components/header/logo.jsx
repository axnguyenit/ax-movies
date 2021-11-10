import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-ax.png';

const Logo = (props) => (
    <div className="">
        <Link to="/">
            <img src={logo} className={`${props.height} mt-3`} alt="" />
        </Link>
    </div>
);

export default Logo;
