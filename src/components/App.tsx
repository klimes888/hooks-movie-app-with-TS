import React, { useReducer, useEffect } from 'react';

import Header from './Header';
import Movie from './Movie';
import spinner from '../assets/ajax-loader.gif';
import Search from './Search';
import { initialState, reducer } from '../store/reducer';
import axios from 'axios';

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b';

type MovieType = { Poster?: string; Title: string; Year?: string };

const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue: string): void => {
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(jsonResponse => {
      if (jsonResponse.data.Response === 'True') {
        dispatch({
          type: 'SEARCH_MOVIES_SUCCESS',
          payload: jsonResponse.data.Search,
        });
      } else {
        dispatch({
          type: 'SEARCH_MOVIES_FAILURE',
          error: jsonResponse.data.Error,
        });
      }
    });
  };

  const imagesHandler = (): JSX.Element | JSX.Element[] => {
    const { movies, errorMessage, loading } = state;

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
