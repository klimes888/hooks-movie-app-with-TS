import React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE = 'https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg';

type Props = {
  movie: { Poster?: string; Title: string; Year?: string };
};

const Movie = ({ movie }: Props): JSX.Element => {
  const poster = movie.Poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie">
      <h2 data-testid="movie_header">{movie.Title}</h2>
      <div>
        <img width="200" alt={`The movie titled: ${movie.Title}`} src={poster} data-testid="movie_image" />
      </div>
      <p data-testid="movie_date">({movie.Year})</p>
    </div>
  );
};

export default Movie;
