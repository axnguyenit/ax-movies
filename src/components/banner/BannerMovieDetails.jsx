import React from 'react';
import { imageApi } from '../../api';
import Overview from '../overview';
import { Link, useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function BannerDetails({ movieDetails }) {
  const { category, id } = useParams();
  const background = imageApi.originalImage(
    movieDetails.backdrop_path ? movieDetails.backdrop_path : movieDetails.poster_path
  );

  const title = movieDetails.name ? movieDetails.name : movieDetails.title;
  const poster = imageApi.w500Image(
    movieDetails.poster_path ? movieDetails.poster_path : movieDetails.backdrop_path
  );
  const path =
    category === 'movie' ? `/catalog/movie/${id}/play` : `/catalog/tv/${id}/play`;

  return (
    <div
      className="header__catalog h-auto bg-cover bg-center bg-no-repeat py-24 text-gray-300"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="block w-11/12 mx-auto">
        <div className="flex mt-812:flex-row flex-col relative z-20 items-center mt-812:space-x-10">
          <div className="mt-812:w-1/3 block mt-414:hidden mt-812:block">
            <img
              src={poster}
              className="mt-1024:h-508 h-508 mt-414:h-380 w-90 object-cover rounded-md shadow-lg"
              alt=""
            />
          </div>
          <div className="mt-812:w-3/4">
            <Overview title={title} overview={movieDetails} />
            <div className="mt-3">
              <Link
                to={path}
                className="px-3 mt-350:px-2 py-2 mt-414:px-4 mt-414:py-3 inline-flex items-center bg-red-600 btn__primary mt-350:space-x-3 rounded shadow-lg overflow-hidden font-semibold tracking-wider uppercase"
              >
                <svg
                  className="hidden mt-350:block fill-current text-gray-300"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 6v12l10-6z"></path>
                </svg>
                <span className="pt-0.5">Play now</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
