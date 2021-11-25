import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../../api/tmdbApi';
import { DetailsBanner } from '../../components/banner';
import Cast from '../../components/cast';
import Iframe from './iframe';
import { MovieList } from '../../components/movies';

const MovieDetails = (props) => {
    const { category, id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const [videos, setVideos] = useState([]);

    const fetchDetails = async () => {
        const params = {};
        const response = await tmdbApi.detail(category, id, { params });
        setMovieDetails(response);

        const responseVideos = await tmdbApi.getVideos(category, id);
        setVideos(responseVideos.results);

        const title = response.title ? response.title : response.name;
        document.title = `${title} - Ax Nguyen`;
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    return (
        <div>
            <DetailsBanner movieDetails={movieDetails} />
            <div className="space-y-10 mb-10">
                {videos &&
                    videos.map((item) => <Iframe key={item.id} item={item} />)}
            </div>
            <Cast />
            <div className="w-11/12 mx-auto">
                <div className="-mx-3">
                    <MovieList
                        category={category}
                        type="similar"
                        title="Similar"
                        id={id}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
