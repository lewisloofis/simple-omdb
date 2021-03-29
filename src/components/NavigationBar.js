import * as React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

/**
 * Navigation bar
 *
 * Navigate through the whole app using this bar. This bar contains:
 * - Search functionality
 * - Navigation to home page
 */
const NavigationBar = () => {
  const [showSearchBar, setSearchBarVisibility] = React.useState(false);

  /**
   * Handle users open / close search bar command
   */
  const handleToggleSearchBar = () => {
    setSearchBarVisibility(!showSearchBar);
  };

  return (
    <nav className="navbar level" role="navigation" aria-label="main navigation">
      {/* Site brand */}
      <div className="navbar-brand level">
        <Link class="navbar-item mt-4 ml-2" to="/">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Logo" width="112" height="28" />
        </Link>

        {/* Search button, only shown on mobile screens. This will show search input specific for mobile screens */}
        <div className="level-right is-hidden-tablet">
          <button
            onClick={handleToggleSearchBar}
            className="level-item button is-inverted is-primary mt-4 mx-4"
          >
            <span className="icon is-small">
              <i className="fas fa-search"></i>
            </span>
          </button>
        </div>
      </div>

      {/* Special search input, visible only on tablet screens or wider. This will substitute the mobile only search input below */}
      <div className="level-item field mx-4 is-hidden-mobile">
        <p className="control has-icons-left">
          <input className="input is-rounded is-primary has-text-weight-bold" type="text" placeholder="Search movies here" />
          <span className="icon is-left">
            <i className="fas fa-search has-text-primary" />
          </span>
        </p>
      </div>

      {/* Search movie input styled for mobile, only shown on mobile screens. Can only be seen by pressing search button above */}
      <div
        className={cx({
          "level-item field is-hidden-tablet my-4 mx-4": true,
          "is-hidden": !showSearchBar,
        })}
      >
        <p className="control has-icons-left">
          <input className="input is-rounded is-primary has-text-weight-bold" type="text" placeholder="Search movies here" />
          <span className="icon is-left">
            <i className="fas fa-search has-text-primary" />
          </span>
        </p>
      </div>
    </nav>
  );
};

export default NavigationBar;
