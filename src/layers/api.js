const { REACT_APP_SOURCE_API, REACT_APP_APIKEY } = process.env;

/**
 * Search movie list API response
 * @typedef {Object} SearchMovieResponse
 * @property {"True" | "False"} Response Search result responnse, can be True or False
 * @property {string} totalResults Search result total items
 * @property {Array<Movie>=} Search Search result, containing list of movies 
 */

/**
 * @typedef {Object} Movie
 * @property {string} Title Movie title
 * @property {string} Year Year the movie is released
 * @property {string} Poster Movie poster URL
 * @property {string} imdbID Movie ID at IMDB
 */

/**
 * @typedef {Object} MovieDetail
 * @property {string} Title Movie title
 * @property {string} Year Year the movie is released
 * @property {string} Poster Movie poster URL
 * @property {string} Plot Movie synopsis
 * @property {string} Genre Movie genre, separated by comma
 * @property {string} Director Movie director
 * @property {string} Actors Movie actors, separated by comma
 * @property {string} imdbID Movie ID at IMDB
 * @property {string} imdbRating Movie rating
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
