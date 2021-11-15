import axiosClient from './axiosClient';

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

const tmdbApi = {
    getTrendingList: (category, params) => {
        const url = `trending/${category}/day`;
        return axiosClient.get(url, params);
    },
    getMoviesList: (type, params) => {
        const url = `movie/${movieType[type]}`;
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = `tv/${tvType[type]}`;
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = `${category[cate]}/${id}/videos`;
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = `search/${category[cate]}`;
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = `${category[cate]}/${id}`;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = `${category[cate]}/${id}/credits`;
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = `${category[cate]}/${id}/similar`;
        return axiosClient.get(url, { params: {} });
    },
    getTVSeasons: (id, season_number) => {
        const url = `tv/${id}/season/${season_number}`;
        return axiosClient.get(url, { params: {} });
    },
};

export default tmdbApi;
