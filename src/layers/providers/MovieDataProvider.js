/**
 * MovieDataProvider
 * 
 * This file is basically the logic behind this app. Datas are
 * stored in this data provider. If any page need this data,
 * it can use the hooks (like `useMovieListData` or `useMovieDetailData`)
 * provided in this file to consume it
 * 
 * Needs to be used inside `<NavigationBarContextProvider />`
 */
import debounce from 'lodash.debounce';
import * as React from 'react';
import { searchFromOMDB, getMovieFromOMDB } from '../api';
import { useNavigationBarData } from './NavigationBarContextProvider';

const movieDetailDefaultState = {
  Title: '',
  Year: '',
  Poster: '',
};

const MovieListContext = React.createContext([]);
const MovieListHasMoreStateContext = React.createContext(false);
const MovieDetailContext = React.createContext(movieDetailDefaultState);
const MovieListLoadingContext = React.createContext(false);
const MovieListGetByIdContext = React.createContext(() => {});
const MovieListLoadMoreContext = React.createContext(() => {});
const MovieListErrorMessageContext = React.createContext('');
const MovieListResetContext = React.createContext(() => {});

/**
 * Movie list data provider, regulates data used in our app 
 * @param {Object} props React props
 * @param {React.ReactChildren} props.children React children
 */
const MovieDataProvider = ({ children }) => {
  const { searchedValue, setSearchedValue } = useNavigationBarData();

  /**
   * Movies data for home page list are being stored in this state
   */
  const [movies, setMovies] = React.useState([]);

  /**
   * Track if request is still being worked
   */
  const [loading, setLoading] = React.useState(false);

  /**
   * Determine paging of search result
   */
  const [page, setPage] = React.useState(1);

  /**
   * Error message shown for users
   */
  const [errorMessage, setErrorMessage] = React.useState('');

  /**
   * This tells if more movies can be loaded
   */
  const [hasMoreMovies, setHasMoreMovies] = React.useState(false);

  /**
   * Movie detail data, for page displaying specific movie data
   */
  const [movieDetail, setMovieDetail] = React.useState(movieDetailDefaultState);

  /**
   * Reset movie list state
   */
  const resetMovieListState = () => {
    setSearchedValue('');
    setErrorMessage('');
    setHasMoreMovies(false);
    setMovies([]);
    setPage(1);
  };

  /**
   * Increment page number state, if load more is triggered.
   * We use debounce to prevent this triggered multiple times due to visibility listener
   */
  const loadMoreMovies = debounce(() => {
    setPage(page + 1);
  }, 250);

  /**
   * Get movie data from OMDB, returns movie data
   * @param {string} title Movie title
   * @param {number} page Paging number of movies data
   */
  const getMovieById = React.useCallback(async (id) => {
    const movie = await getMovieFromOMDB(id);
    return setMovieDetail(movie);
  }, [setMovieDetail]);

  React.useEffect(() => {
    const searchMovies = async () => {
      if (!searchedValue) return;

      // Mark request as on progress
      setLoading(true);

      // Always look for the first page, if user trigger search for the first time
      const moviesAPIResponse = await searchFromOMDB(searchedValue, page);

      // Mark current request done, and save current page state
      setLoading(false);

      // Save movie response if the response is correct
      if (moviesAPIResponse.Response === 'True' && Array.isArray(moviesAPIResponse.Search)) {
        const newMoviesArray = page > 1 ? [...movies, ...moviesAPIResponse.Search] : [...moviesAPIResponse.Search];
        // Signal to our app that this search has more movies that can be loaded
        setHasMoreMovies(newMoviesArray.length < Number(moviesAPIResponse.totalResults));

        // Save movies data
        return setMovies(newMoviesArray);
      }

      // Set error message
      return setErrorMessage(moviesAPIResponse.Error);
    }
    searchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchedValue]);

  // We cannot include movies as useEffect dependency due to cyclical dependencies which will cause infinite rerender,
  // so we disable eslint just for this case.

  return (
    <MovieListContext.Provider value={movies}>
      <MovieListHasMoreStateContext.Provider value={hasMoreMovies}>
        <MovieDetailContext.Provider value={movieDetail}>
          <MovieListErrorMessageContext.Provider value={errorMessage}>
            <MovieListLoadingContext.Provider value={loading}>
              <MovieListLoadMoreContext.Provider value={loadMoreMovies}>
                <MovieListGetByIdContext.Provider value={getMovieById}>
                  <MovieListResetContext.Provider value={resetMovieListState}>
                    {children}
                  </MovieListResetContext.Provider>
                </MovieListGetByIdContext.Provider>
              </MovieListLoadMoreContext.Provider>
            </MovieListLoadingContext.Provider>
          </MovieListErrorMessageContext.Provider>
        </MovieDetailContext.Provider>
      </MovieListHasMoreStateContext.Provider>
    </MovieListContext.Provider>
  );
};


/**
 * Use movie list data stored in this context provider
 */
export const useMovieListData = () => {
  const movies = React.useContext(MovieListContext);
  const hasMoreMovies = React.useContext(MovieListHasMoreStateContext);
  const errorMessage = React.useContext(MovieListErrorMessageContext);
  const loading = React.useContext(MovieListLoadingContext);
  const loadMoreMovies = React.useContext(MovieListLoadMoreContext);
  const resetMovieList = React.useContext(MovieListResetContext);

  if (movies === undefined) throw new Error('useMovieListData must be used inside <MovieDataProvider />');
  if (hasMoreMovies === undefined) throw new Error('useMovieListData must be used inside <MovieDataProvider />');

  return {
    movies,
    errorMessage,
    hasMoreMovies,
    loading,
    loadMoreMovies,
    resetMovieList,
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
