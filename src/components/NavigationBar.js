import * as React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import composeClass from 'classnames';

import { useMovieListData } from 'layers/providers/MovieDataProvider';
import { useNavigationBarData } from 'layers/providers/NavigationBarContextProvider';
import debounce from 'lodash.debounce';
import { searchFromOMDB } from 'layers/api';

/**
 * Navigation bar
 *
 * Navigate through the whole app using this bar. This bar contains:
 * - Search functionality
 * - Navigation to home page
 */
const NavigationBar = () => {
  const history = useHistory();
  const location = useLocation();

  const searchInput = React.useRef(null);

  // Store typed value
  const [typedValue, setTypedValue] = React.useState('');

  // This variable will decide if we need to show menu on mobile
  const [showMenu, setShowMenu] = React.useState(false);

  const [showAutoComplete, setShowAutoComplete] = React.useState(false);
  const [autocompleteResult, setAutocompleteResult] = React.useState([]);

  // We differentiate the value typed by users to implement autocomplete features.
  // Users will need to press enter to confirm search and show result in home page
  const { setSearchedValue } = useNavigationBarData();

  React.useEffect(() => {
    const searchAutocompleteResult = debounce(async () => {
      // Always look for the first page, if user triggers autocomplete
      const moviesAPIResponse = await searchFromOMDB(typedValue, 1);
      if (moviesAPIResponse.Response === 'True') {
        setAutocompleteResult(moviesAPIResponse.Search);
        setShowAutoComplete(true);
      }
    }, 250);

    // If users type more than 2 chars, show autocomplete
    if (typedValue.length > 2) {
      searchAutocompleteResult()
    } else {
      setShowAutoComplete(false);
    }
  }, [typedValue]);

  /**
   * Listen to clicks outside search input, hide autocomplete if there is any click
   * outside search input
   */
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInput.current && !searchInput.current.contains(event.target)) {
        setShowAutoComplete(false);
      }
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [searchInput]);

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
    // Clear autocomplete
    setShowAutoComplete(false);

    // Make sure users don't get redirected after form submit
    event.preventDefault();

    // Reset any last search state
    resetMovieList();

    // Initiate search movie
    setSearchedValue(typedValue);

    // Movie list view is only available at homepage.
    // So redirect users to home page if user is not searching on home page
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  /**
   * Show autocomplete if input is in focus
   */
  const handleInputFocus = () => {
    setShowAutoComplete(true);
  }

  return (
    <nav className="navbar level" role="navigation" aria-label="main navigation">
      {/* Site brand location, this block will show our logo */}
      <div className="navbar-brand">
        {/* Site logo */}
        <Link to="/" className="navbar-item is-family-monospace has-text-weight-bold is-size-4 has-text-dark">
          OMDB
        </Link>

        {/* This is toggle button for showing menu on mobile screen */}
        <button
          className="navbar-burger button is-inverted is-dark"
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
            {/* Search input block */}
            <form className="field search-bar" onSubmit={handleSearchMovie}>
              <div className="control has-icons-left">
                <input
                  ref={searchInput}
                  type="text"
                  placeholder="Search movies"
                  className="input is-rounded"
                  value={typedValue}
                  onChange={handleTypeToSearch}
                  onFocus={handleInputFocus}
                />
                <span className="icon is-small is-left has-text-dark">
                  <i className="fas fa-search" />
                </span>
              </div>

              {/* Autocomplete box */}
              {showAutoComplete && (
                <div className="box autocomplete mt-2">
                  {Array.isArray(autocompleteResult) && autocompleteResult.map(result => (
                    <Link className="has-text-black" to={`/movies/${result.imdbID}`}>{result.Title} ({result.Year})</Link>
                  ))}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
