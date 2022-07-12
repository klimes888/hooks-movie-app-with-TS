import React, { useReducer } from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

import { renderHook, act } from '@testing-library/react-hooks';

import { IndexProvider, initialState } from '../store/reducer/IndexStore';
import { reducer } from '../store/reducer/index';
import axios from 'axios';

const AppTest = ({ state }) => {
  return (
    <IndexProvider.Provider value={{ state }}>
      <App />
    </IndexProvider.Provider>
  );
};

describe('App Component Render Test', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('App Describe Text Render Test', async () => {
    const { result } = renderHook(() => useReducer(reducer, initialState));
    const [, dispatch] = result.current;
    // SEARCH_MOVIES_FAILURE
    act(() => {
      dispatch({ type: 'SEARCH_MOVIES_FAILURE', error: 'error' });
    });
    const { rerender } = render(AppTest({ state: result.current[0] }));

    rerender(AppTest({ state: result.current[0] }));

    expect(screen.getByText(result.current[0].errorMessage).textContent).toBe('error');

    const mockAxios = jest.spyOn(axios, 'get');
    console.log(mockAxios);
    // mockAxios.mockImplementation(() => {})

    // SEARCH_MOVIES_REQUEST
    act(() => {
      // dispatch({ type: 'SEARCH_MOVIES_SUCCESS', payload: [{ Poster: 'string', Title: 'string', Year: '' }] });
      dispatch({ type: 'SEARCH_MOVIES_REQUEST' });
    });

    rerender(AppTest({ state: result.current[0] }));
    expect(screen.getByTestId('test_img').src).toBe('http://localhost/test-file-stub');

    //SEARCH_MOVIES_SUCCESS
    act(() => {
      dispatch({ type: 'SEARCH_MOVIES_SUCCESS', payload: [{ Poster: 'Test_Image', Title: 'Test_Title', Year: '2011-02-01' }] });
    });

    rerender(AppTest({ state: result.current[0] }));
    const getState = result.current[0].movies[0];
    expect(screen.queryByTestId('movie_header').textContent).toBe(getState.Title);
    expect(screen.queryByTestId('movie_image').src).toBe('http://localhost/' + getState.Poster);
    expect(screen.queryByTestId('movie_date').textContent).toBe('(' + getState.Year + ')');
  });
});
