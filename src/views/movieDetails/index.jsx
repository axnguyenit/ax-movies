import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import { DetailsBanner } from '../../components/banner';
import Cast from '../../components/cast';

const MovieDetails = (props) => {
    const { category, id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});

    const fetchDetails = async () => {
        const params = {};
        const response = await tmdbApi.detail(category, id, { params });
        setMovieDetails(response);

        const title = response.title ? response.title : response.name;
        document.title = `${title} - Ax Nguyen`;
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    return (
        <div>
            <DetailsBanner movieDetails={movieDetails} />
            <Cast />
        </div>
    );
};

export default MovieDetails;
