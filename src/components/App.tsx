import React, { useEffect, useContext } from 'react';

// components
import Header from './Header';
import Movie from './Movie';
import Search from './Search';

// reducers
import { IndexProvider } from '../store/reducer/IndexStore';

// contexts
import axios from 'axios';

// icons
import spinner from '../assets/ajax-loader.gif';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

type MovieType = { Poster?: string; Title: string; Year?: string };

const App = (): JSX.Element => {
  const reducer = useContext(IndexProvider);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      reducer?.dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

  const search = (searchValue: string): void => {
    reducer?.dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(jsonResponse => {
      if (jsonResponse.data.Response === 'True') {
        reducer?.dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.data.Search,
        });
      } else {
        reducer?.dispatch({
          type: 'SEARCH_MOVIES_FAILURE',
          error: jsonResponse.data.Error,
        });
      }
    });
  };

  const imagesHandler = (): JSX.Element | JSX.Element[] => {
    if(!reducer?.state) return <></>;
    const { movies, errorMessage, loading } = reducer.state;

    if (loading && !errorMessage) {
      return <img className="spinner" src={spinner} alt="Loading spinner" />;
    } else if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    } else {
      return movies.map((movie: MovieType, index: number) => <Movie key={`${index}-${movie.Title}`} movie={movie} />);
    }
  };

  return (
    <div className="App">
      <div className="m-container">
        <Header text="HOOKED" />
        <Search search={search} />
        <p className="App-intro">Sharing a few of our favourite movies</p>
        <div className="movies">{imagesHandler()}</div>
      </div>
    </div>
  );
};

export default App;
