import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, selectAllMovies } from '../Redux/moviesReducer';
import MovieCard from './MovieCard';
import AddMovieModal from './AddMovieModal';


const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectAllMovies);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div> 
        <button onClick={() => setModalOpen(true)}>Add Movie</button>
    <div className="movie-list">
    <AddMovieModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
    </div>
  );
};

export default MovieList;
