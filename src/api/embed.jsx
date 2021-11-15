const embedMovie = (id) => `https://www.2embed.ru/embed/tmdb/movie?id=${id}`;
const embedEpisode = (id, season, episode) =>
    `https://www.2embed.ru/embed/tmdb/tv?id=${id}&s=${season}&e=${episode}`;

export { embedMovie, embedEpisode };
