import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-ax.png';

// ----------------------------------------------------------------------

export default function Logo({ height }) {
  return (
    <div className="">
      <Link to="/">
        <img src={logo} className={`${height} mt-3`} alt="" />
      </Link>
    </div>
  );
};
