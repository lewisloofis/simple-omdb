import * as React from 'react';
import { Link } from 'react-router-dom';

import { useMovieListData } from 'layers/MovieDataProvider';

/**
 * Navigation bar
 *
 * Navigate through the whole app using this bar. This bar contains:
 * - Search functionality
 * - Navigation to home page
 */
const NavigationBar = () => {
  // We are storing search input value in these variable
  const [searchedValue, setSearchedValue] = React.useState('');

  const { searchMovies } = useMovieListData();

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

    await searchMovies(searchedValue);
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
