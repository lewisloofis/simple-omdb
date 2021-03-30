import * as React from 'react';

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
    <div>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
