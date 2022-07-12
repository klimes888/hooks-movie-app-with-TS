import React from 'react';
import { render, screen } from '@testing-library/react';
import Movie from '../components/Movie';

it('Movie Components Success Render Test', async () => {
  const fakeMovies = {
    Title: 'Ironman!',
    Poster: 'www.imagesTest.com',
    Year: '2011-11-20',
  };

  render(<Movie movie={fakeMovies} />);
  expect(screen.getByTestId('movie_header').textContent).toBe(fakeMovies.Title);
  expect(screen.getByTestId('movie_date').textContent).toBe('(' + fakeMovies.Year + ')');
  expect(screen.getByTestId('movie_image').src).toBe('http://localhost/' + fakeMovies.Poster);
});
