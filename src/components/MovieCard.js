import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * Movie card element
 *
 * This component will show movies important data to users.
 * Shown in group on home page as a list.
 * @param {Object} props React props 
 * @param {import('layers/api').Movie} props.movie Movie data
 */
const MovieCard = ({ movie }) => {
  return (
    <Link className="card movie-card mb-4" to={`/movies/${movie.imdbID}`}>
      <div className="card-image">
        <figure className="image is-2by3">
          <img className="has-ratio" src={movie.Poster} alt={movie.Title} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <h3>{movie.Title} ({movie.Year})</h3>
          <span className="movie-card-tag is-size-7">{movie.Type}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
