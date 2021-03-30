import * as React from 'react';
import MovieCard from '../components/MovieCard';
import InfiniteScroll from '../components/InfiniteScroll';
import { useMovieListData } from '../layers/providers/MovieDataProvider';

const Home = () => {
  const {
    movies,
    hasMoreMovies,
    errorMessage,
    loadMoreMovies,
  } = useMovieListData();

  const handleLoadMore = async () => {
    loadMoreMovies();
  };

  // Show error message if any
  if (!!errorMessage) {
    return (
      <div>
        {errorMessage}
      </div>
    );
  }

  // Show welcome text if movies are not searched yet
  if (Array.isArray(movies) && movies.length === 0) {
    return (
      <div>
        Welcome! You can search any movies using search bar above.
      </div>
    );
  };

  // Show search movie result if there is any
  return (
    <div>
      {/* Movie list */}
      <InfiniteScroll
        hasMore={hasMoreMovies}
        onLoadMore={handleLoadMore}
      >
        {movies.map(movie => <MovieCard key={movie.imdbID + movie.Title} movie={movie} />)}
      </InfiniteScroll>
    </div>
  );
};

export default Home;
