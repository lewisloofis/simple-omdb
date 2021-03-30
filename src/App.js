import MovieDataProvider from 'layers/providers/MovieDataProvider';
import NavigationBarContextProvider from 'layers/providers/NavigationBarContextProvider';
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
      <NavigationBarContextProvider>
        <MovieDataProvider>
          <Router>
            <NavigationBar />
            <div>
              <Switch>
                <Route exact path="/movies/:movieId" component={MovieDetail} />
                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </Router>
        </MovieDataProvider>
      </NavigationBarContextProvider>
    </div>
  );
}

export default App;
