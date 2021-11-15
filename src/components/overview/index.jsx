import React from 'react';
import { Link } from 'react-router-dom';
import { Star, StarHalf, StarSolid } from '../star';
import { useParams } from 'react-router';

const Overview = (props) => {
    const { title, overview } = props;
    const { category } = useParams();

    const handleRenderStar = (n) => {
        let i = 0;
        let stars = [];
        let surplus = n % 1;
        n = Math.floor(n / 1);
        while (i < n) {
            stars.push(<StarSolid />);
            i++;
        }
        if (surplus) {
            stars.push(<StarHalf />);
        }
        n = 10 - n;
        i = surplus ? 1 : 0;
        while (i < n) {
            i++;
            stars.push(<Star />);
        }
        return stars;
    };
    return (
        <div className="text-gray-300 relative z-10 space-y-2 pt-3">
            <h1>
                <Link
                    to="/"
                    className="text-2xl hover:text-red-600 duration-150"
                >
                    {title}
                </Link>
            </h1>
            {category === 'tv' && (
                <h2 className="text-lg">
                    Episode name:&nbsp;{overview.name || overview.title}
                </h2>
            )}
            <p>{overview.overview}</p>
            <div>
                Release Date:&nbsp;
                {overview.first_air_date ||
                    overview.release_date ||
                    overview.air_date}
            </div>
            <div className="flex">
                {handleRenderStar(overview.vote_average)}
                <span className="ml-2">({overview.vote_count}&nbsp;votes)</span>
            </div>
        </div>
    );
};

export default Overview;
