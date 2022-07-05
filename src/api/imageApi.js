import { TMDB_IMAGE_URL } from '../config';

// ----------------------------------------------------------------------

const imageApi = {
  originalImage: (imgPath) => `${TMDB_IMAGE_URL}/original/${imgPath}`,
  w500Image: (imgPath) => `${TMDB_IMAGE_URL}/w500/${imgPath}`,
  w200Image: (imgPath) => `${TMDB_IMAGE_URL}/w200/${imgPath}`,
};
export { imageApi };
