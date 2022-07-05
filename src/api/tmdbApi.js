import axios from './axios';

// ----------------------------------------------------------------------

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  trending: 'trending',
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  trending: 'trending',
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
};

export const tmdbApi = {
  getTrendingList: (category, params) => {
    const url = `trending/${category}/day`;
    return axios.get(url, params);
  },
  getMoviesList: (type, params) => {
    const url = `movie/${movieType[type]}`;
    return axios.get(url, params);
  },
  getTvList: (type, params) => {
    const url = `tv/${tvType[type]}`;
    return axios.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = `${category[cate]}/${id}/videos`;
    return axios.get(url, { params: {} });
  },
  search: (cate, params) => {
    const url = `search/${category[cate]}`;
    return axios.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = `${category[cate]}/${id}`;
    return axios.get(url, params);
  },
  credits: (cate, id) => {
    const url = `${category[cate]}/${id}/credits`;
    return axios.get(url, { params: {} });
  },
  similar: (cate, id) => {
    const url = `${category[cate]}/${id}/similar`;
    return axios.get(url, { params: {} });
  },
  getTVSeasons: (id, seasonNumber) => {
    const url = `tv/${id}/season/${seasonNumber}`;
    return axios.get(url, { params: {} });
  },
};
