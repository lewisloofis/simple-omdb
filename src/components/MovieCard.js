import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * @typedef {Object} Movie
 * @property {string} Title Movie title
 * @property {string} Year Year the movie is released
 * @property {string} Poster Movie poster URL
 */

/**
 * Movie card element
 *
 * This component will show movies important data to users.
 * Shown in group on home page as a list.
 * @param {Object} props React props 
 * @param {Movie} props.movie Movie data
 */
const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.imdbID}`}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </Link>
  );
};

export default MovieCard;
