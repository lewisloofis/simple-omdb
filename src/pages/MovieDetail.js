import * as React from 'react';
import { useParams } from 'react-router-dom';

import { useMovieDetailData } from 'layers/providers/MovieDataProvider';

const MovieDetail = () => {
  const { movieId } = useParams();

  const { movieDetail } = useMovieDetailData(movieId);

  // Don't render anything if there is no movie
  if (!movieDetail) return null;

  return (
    <div className="container">
      <div className="box">
        <article className="media is-flex-wrap-wrap">
          <div className="media-left movie-detail-image">
            <figure className="image is-2by3 mb-4">
              <img className="has-aspect-ratio" src={movieDetail.Poster} alt={movieDetail.Title} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <h3>{movieDetail.Title} ({movieDetail.Year})</h3>
              <p><b>Rating:</b> {movieDetail.imdbRating} / 10</p>
              <p><b>Genre:</b> {movieDetail.Genre}</p>
              <p><b>Director:</b> {movieDetail.Director}</p>
              <p><b>Actors:</b> {movieDetail.Actors}</p>
              <p><b>Type:</b> {movieDetail.Type}</p>
              <span><b>Synopsis:</b></span>
              <p>{movieDetail.Plot}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MovieDetail;
