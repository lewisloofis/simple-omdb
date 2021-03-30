import * as React from 'react';
import { Link } from 'react-router-dom';

import { useMovieListData } from 'layers/providers/MovieDataProvider';
import { useNavigationBarData } from 'layers/providers/NavigationBarContextProvider';

/**
 * Navigation bar
 *
 * Navigate through the whole app using this bar. This bar contains:
 * - Search functionality
 * - Navigation to home page
 */
const NavigationBar = () => {
  const {
    searchedValue,
    setSearchedValue,
  } = useNavigationBarData();

  const {
    resetMovieList,
    searchMovies,
  } = useMovieListData();

  /**
   * Handle user's typing event when they search movies
   */
  const handleTypeToSearch = (event) => {
    const searchedMovieTitle = event.currentTarget.value;
    setSearchedValue(searchedMovieTitle);
  };

  /**
   * Handle user's command to search movies
   */
  const handleSearchMovie = async (event) => {
    // Make sure users don't get redirected after form submit
    event.preventDefault();

    // Reset any last search state
    resetMovieList();

    // Initiate search movie
    await searchMovies();
  };

  return (
    <nav role="navigation" aria-label="main navigation">
      {/* Site brand */}
      <Link to="/">
        LMovies
      </Link>

      <form onSubmit={handleSearchMovie}>
        <input
          type="text"
          placeholder="Search movies"
          value={searchedValue}
          onChange={handleTypeToSearch}
        />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    </nav>
  );
};

export default NavigationBar;
