import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
// components
import Page from '../../components/page';
import Video from '../../components/video';
import Overview from '../../components/overview';
import Preloader from '../../components/preloader';
import { Season } from '../../components/tv-seasons';
import { MovieList } from '../../modules/movies';
// api
import { tmdbApi, imageApi, embedMovie, embedEpisode } from '../../api';
import { handleScrollToTop } from '../../utils';

// ----------------------------------------------------------------------

export default function PlayMovie() {
  const { category, id } = useParams();
  const otherRef = useRef(null);
  const [src, setSrc] = useState('');
  const [title, setTitle] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [overview, setOverview] = useState({});
  const [preloader, setPreloader] = useState(true);
  const [background, setBackground] = useState('');
  const [, setSearchParams] = useSearchParams();

  const fetchMovie = async () => {
    try {
      const params = {};
      const response = await tmdbApi.detail(category, id, { params });
      if (category === 'tv') {
        setSeasons(response.seasons);
        setOverview(response);
      } else {
        setOverview(response);
        const { results } = await tmdbApi.getTrendingList(category, {
          params,
        });
        setSeasons(results);
      }
      const backgroundTemp = response.backdrop_path
        ? response.backdrop_path
        : response.poster_path;
      setBackground(backgroundTemp);

      const titleTemp = response.title ? response.title : response.name;
      setTitle(titleTemp);
      setPreloader(false);
    } catch (error) {}
  };

  const handleUrl = (season = 1, episode = overview) => {
    if (category === 'movie') return setSrc(embedMovie(id));

    setOverview(episode);
    setSrc(embedEpisode(id, season, episode.episode_number ? episode.episode_number : 1));
    setSearchParams({ season, episode: episode.episode_number || 1 });

    handleScrollToTop();
  };

  const handleBackground = (movie) => {
    return movie.backdrop_path ? movie.backdrop_path : movie.poster_path;
  };

  useEffect(() => {
    fetchMovie();
    handleUrl();
    handleScrollToTop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (preloader) return <Preloader />;

  return (
    <Page title={title}>
      <div
        className="bg__play w-full bg-cover bg-no-repeat bg-center pt-16 mt-812:pb-10"
        style={{
          backgroundImage: `url(${imageApi.originalImage(background)})`,
        }}
      >
        <div className="w-full mt-812:px-0 px-3 mt-812:w-11/12 mx-auto">
          <div className="flex mt-812:flex-row flex-col mt-812:space-x-5">
            <div className="w-full mt-812:w-2/3 mb-5 mt-812:mb-0">
              <Video src={src} />
              <Overview title={title} overview={overview} />
            </div>
            <div className="w-full mt-812:w-1/3 z-10" ref={otherRef}>
              <div className="text-gray-300 text-2xl mb-2">
                {category === 'tv' ? 'Other Episodes' : 'Trending Movies'}
              </div>
              <div className="h-700 overflow-y-auto overflow-hidden rounded-md scroll__custom space-y-2">
                {seasons &&
                  seasons.map((season) => {
                    return (
                      <Season
                        key={season.id}
                        season={season}
                        background={background || handleBackground(season)}
                        handleUrl={handleUrl}
                        category={category}
                        id={id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="relative z-10 -mx-3">
            <MovieList category={category} type="similar" title="Similar" id={id} />
          </div>
        </div>
      </div>
    </Page>
  );
}
