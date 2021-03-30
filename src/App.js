import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Our search bar component
import NavigationBar from './components/NavigationBar';

// App pages
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';

/**
 * OMDB app
 *
 * This app will basically show any movies you search from the search bar.
 */
function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <div className="container is-max-widescreen">
          <Switch>
            <Route exact path="/movies/:movieId" component={MovieDetail} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
