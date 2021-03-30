/**
 * MovieDataProvider
 * 
 * This file is basically the logic behind this app. Datas are
 * stored in this data provider. If any page need this data,
 * it can use the hooks (like `useMovieListData` or `useMovieDetailData`)
 * provided in this file to consume it
 */
import * as React from 'react';
import { searchFromOMDB, getMovieFromOMDB } from './api';

const movieDetailDefaultState = {
  Title: '',
  Year: '',
  Poster: '',
};

const MovieListContext = React.createContext([]);
const MovieDetailContext = React.createContext(movieDetailDefaultState);
const MovieListSearchContext = React.createContext(() => {});
const MovieListGetByIdContext = React.createContext(() => {});

/**
 * Movie list data provider, regulates data used in our app 
 * @param {Object} props React props
 * @param {React.ReactChildren} props.children React children
 */
const MovieDataProvider = ({ children }) => {
  /**
   * Movies data for home page list are being stored in this state
   */
  const [movies, setMovies] = React.useState([]);

  /**
   * Movie detail data, for page displaying specific movie data
   */
  const [movieDetail, setMovieDetail] = React.useState(movieDetailDefaultState);

  /**
   * Search movies from OMDB, then save the values to be used
   * appwide.
   * @param {string} title Movie title
   * @param {number} page Paging number of movies data
   */
  const searchMovies = async (title, page = 1) => {
    const moviesAPIResponse = await searchFromOMDB(title, page);
    const searchedMovies = Array.isArray(moviesAPIResponse.Search) ?
    moviesAPIResponse.Search : movies;
    console.log('MOVIEDATALIST', searchedMovies);
    return setMovies(searchedMovies);
  };

  /**
   * Get movie data from OMDB, returns movie data
   * @param {string} title Movie title
   * @param {number} page Paging number of movies data
   */
  const getMovieById = React.useCallback(async (id) => {
    const movie = await getMovieFromOMDB(id);
    console.log('MOVIEDATA', movie);
    return setMovieDetail(movie);
  }, [setMovieDetail]);

  return (
    <MovieListContext.Provider value={movies}>
      <MovieDetailContext.Provider value={movieDetail}>
        <MovieListSearchContext.Provider value={searchMovies}>
          <MovieListGetByIdContext.Provider value={getMovieById}>
            {children}
          </MovieListGetByIdContext.Provider>
        </MovieListSearchContext.Provider>
      </MovieDetailContext.Provider>
    </MovieListContext.Provider>
  );
};

/**
 * Use movie list data stored in this context provider
 */
export const useMovieListData = () => {
  const movies = React.useContext(MovieListContext);
  const searchMovies = React.useContext(MovieListSearchContext);

  if (movies === undefined) throw new Error('useMovieListData must be used inside <MovieDataProvider />');
  if (searchMovies === undefined) throw new Error('useMovieListData must be used inside <MovieDataProvider />');
  return {
    movies,
    searchMovies,
  };
}

/**
 * Use movie detail data stored in context provider
 * @param {string} id Movie ID
 */
export const useMovieDetailData = (id) => {
  const movieDetail = React.useContext(MovieDetailContext);
  const getMovieById = React.useContext(MovieListGetByIdContext);

  if (movieDetail === undefined) {
    throw new Error('useMovieDetailData must be used inside <MovieDataProvider />');
  }

  if (getMovieById === undefined) {
    throw new Error('useMovieDetailData must be used inside <MovieDataProvider />');
  }
 
  /**
   * On mounted, get movie data by ID defined in parameter
   */
  React.useEffect(() => {
    getMovieById(id);
  }, [id, getMovieById]);

  return {
    movieDetail,
    getMovieById,
  };
}

export default MovieDataProvider;
