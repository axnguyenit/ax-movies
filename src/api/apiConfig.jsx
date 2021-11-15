const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: process.env.REACT_APP_TMDB_API_KEY,
    originalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    w200Image: (imgPath) => `https://image.tmdb.org/t/p/w200/${imgPath}`,
};
export default apiConfig;
