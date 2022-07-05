import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../components/page';
import Cast from '../../components/cast';
import { MovieList } from '../../modules/movies';
import Preloader from '../../components/preloader';
import { BannerMovieDetails } from '../../components/banner';
import Iframe from './Iframe';
import { tmdbApi } from '../../api';

// ----------------------------------------------------------------------

export default function MovieDetails() {
  const { category, id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [videos, setVideos] = useState([]);
  const [preloader, setPreloader] = useState(true);
  const [title, setTitle] = useState('');

  const fetchDetails = async () => {
    try {
      const params = {};
      const response = await tmdbApi.detail(category, id, { params });
      setMovieDetails(response);

      const responseVideos = await tmdbApi.getVideos(category, id);
      setVideos(responseVideos.results);

      const title = response.title ? response.title : response.name;
      setTitle(title);
      setPreloader(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (preloader) return <Preloader />;

  return (
    <Page title={title}>
      <BannerMovieDetails movieDetails={movieDetails} />
      <div className="space-y-10 mb-10">
        {videos && videos.map((item) => <Iframe key={item.id} item={item} />)}
      </div>
      <Cast />
      <div className="w-11/12 mx-auto">
        <div className="-mx-3">
          <MovieList category={category} type="similar" title="Similar" id={id} />
        </div>
      </div>
    </Page>
  );
};
