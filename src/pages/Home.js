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
      <section className="hero is-large">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="title">Oow! :(</div>
            <div className="subtitle">{errorMessage}</div>
          </div>
        </div>
      </section>
    );
  }

  // Show welcome text if movies are not searched yet
  if (Array.isArray(movies) && movies.length === 0) {
    return (
      <section className="hero is-large">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="title">Hola! 👋</div>
            <div className="subtitle">Welcome! You can search any movies using search bar above.</div>
          </div>
        </div>
      </section>
    );
  };

  // Show search movie result if there is any
  return (
    <div className="container mt-6">
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
