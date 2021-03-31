import * as React from 'react';
import { Link } from 'react-router-dom';
import composeClass from 'classnames';

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
  // Store typed value
  const [typedValue, setTypedValue] = React.useState('');

  // This variable will decide if we need to show menu on mobile
  const [showMenu, setShowMenu] = React.useState(false);

  // We differentiate the value typed by users to implement autocomplete features.
  // Users will need to press enter to confirm search and show result in home page
  const { setSearchedValue } = useNavigationBarData();

  const {
    resetMovieList,
  } = useMovieListData();

  /**
   * Toggle menu visibility on mobile screens
   */
  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  /**
   * Handle user's typing event when they search movies
   */
  const handleTypeToSearch = (event) => {
    const searchedMovieTitle = event.currentTarget.value;
    setTypedValue(searchedMovieTitle);
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
    setSearchedValue(typedValue);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {/* Site brand location, this block will show our logo */}
      <div className="navbar-brand">
        {/* Site logo */}
        <Link to="/" className="navbar-item is-family-monospace has-text-weight-bold is-size-4 has-text-dark">
          OMDB
        </Link>

        {/* This is toggle button for showing menu on mobile screen */}
        <button
          className="navbar-burger button is-inverted is-primary has-background-white"
          aria-label="menu"
          aria-expanded="false"
          onClick={handleToggleMenu}
        >
          <i className="fas fa-search" />
        </button>
      </div>

      <div
        className={composeClass({
          "navbar-menu": true,
          "is-active": showMenu,
        })}
       >
        {/* We want to put our search bar on the right of our menu */}
        <div className="navbar-end">

          {/* Search input, this will be visible only at laptop screen or above, */}
          {/* due to Bulma styling only show `.navbar-menu` on laptop screen (>1024px) */}
          <div className="navbar-item">
            <form className="field" onSubmit={handleSearchMovie}>
              <div className="control has-icons-left">
                <input
                  type="text"
                  placeholder="Search movies"
                  className="input is-rounded"
                  value={typedValue}
                  onChange={handleTypeToSearch}
                />
                <span className="icon is-small is-left has-text-primary">
                  <i className="fas fa-search" />
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
