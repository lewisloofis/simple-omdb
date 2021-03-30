import * as React from 'react';
import { Link } from 'react-router-dom';

/**
 * Navigation bar
 *
 * Navigate through the whole app using this bar. This bar contains:
 * - Search functionality
 * - Navigation to home page
 */
const NavigationBar = () => {
  const [searchedValue, setSearchedValue] = React.useState();

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
  const handleSearchMovie = () => {
    console.log(searchedValue);
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
