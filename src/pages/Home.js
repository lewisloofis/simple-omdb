import * as React from 'react';
import MovieCard from '../components/MovieCard';
import { useMovieListData } from '../layers/MovieDataProvider';

const Home = () => {
  const { movies } = useMovieListData();

  if (Array.isArray(movies) && movies.length === 0) {
    return (
      <div>
        Welcome! You can search any movies using search bar above.
      </div>
    );
  };

  return (
    <div>
      {movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)}
    </div>
  );
};

export default Home;
