const { REACT_APP_SOURCE_API, REACT_APP_APIKEY } = process.env;

/**
 * @typedef {Object} Movie
 * @property {string} Title Movie title
 * @property {string} Year Year the movie is released
 * @property {string} Poster Movie poster URL
 */

/**
 * Search for movies to OMDB api
 * @param {string} title Movie title
 * @param {number} page Data paging number
 * @returns {Promise<Array<Movie>>} Promise which resolve list of movies data
 */
export const searchFromOMDB = (title, page = 1) => {
  return fetch(`${REACT_APP_SOURCE_API}/?apikey=${REACT_APP_APIKEY}&s=${title}&page=${page}`)
    .then(response => response.json());
};

/**
 * Get movie data from their ID
 * @param {string} id OMDB movie ID, based on IMDB
 * @returns {Promise<Movie>} Promise which resolve movie data
 */
export const getMovieFromOMDB = (id) => {
  return fetch(`${REACT_APP_SOURCE_API}/?apikey=${REACT_APP_APIKEY}&i=${id}`)
    .then(response => response.json());
}
