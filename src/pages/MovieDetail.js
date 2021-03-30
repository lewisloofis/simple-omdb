import * as React from 'react';
import { useParams } from 'react-router-dom';

import { useMovieDetailData } from 'layers/providers/MovieDataProvider';

const MovieDetail = () => {
  const { movieId } = useParams();

  // Mock example
  // const movieDetail = {
  //   Actors: "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
  //   Awards: "Nominated for 1 Oscar. Another 13 wins & 78 nominations.",
  //   BoxOffice: "$206,852,432",
  //   Country: "USA, UK",
  //   DVD: "09 Sep 2009",
  //   Director: "Christopher Nolan",
  //   Genre: "Action, Adventure",
  //   Language: "English, Mandarin",
  //   Metascore: "70",
  //   Plot: "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
  //   Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  //   Production: "Warner Brothers, Di Bonaventura Pictures",
  //   Rated: "PG-13",
  //   Ratings: [
  //     { Source: "Internet Movie Database", Value: "8.2/10" },
  //     { Source: "Rotten Tomatoes", Value: "84%" },
  //     { Source: "Metacritic", Value: "70/100" },
  //   ],
  //   Released: "15 Jun 2005",
  //   Response: "True",
  //   Runtime: "140 min",
  //   Title: "Batman Begins",
  //   Type: "movie",
  //   Website: "N/A",
  //   Writer: "Bob Kane (characters), David S. Goyer (story), Christopher Nolan (screenplay), David S. Goyer (screenplay)",
  //   Year: "2005",
  //   imdbID: "tt0372784",
  //   imdbRating: "8.2",
  //   imdbVotes: "1,320,049",
  // };
  const { movieDetail } = useMovieDetailData(movieId);

  if (!movieDetail) return null;

  return (
    <div>
      <div>
        <img src={movieDetail.Poster} alt={movieDetail.Title} />
      </div>
      <div>
        <h3>{movieDetail.Title} ({movieDetail.Year})</h3>
        <p>Rating: {movieDetail.imdbRating}</p>
        <span>Synopsis:</span>
        <p>{movieDetail.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
