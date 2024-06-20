import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleWatchStatus, deleteMovie } from '../Redux/moviesReducer';
import axios from "axios";
import './scss/MovieCard.scss';
import AddMovieModal from './AddMovieModal';
const apiUrl = process.env.REACT_APP_API_URL;


const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleToggleWatched = () => {
    const updatedStatus = !movie.watchStatus; 
    dispatch(toggleWatchStatus({ id: movie._id, watchStatus: updatedStatus }));

    axios.patch(`${apiUrl}/movies/${movie._id}/watchStatus`, { watchStatus: updatedStatus })
      .then((response) => console.log('Updated movie:', response.data))
      .catch((error) => console.error('Error updating movie:', error));
  };

  const handleDelete = () => {
    dispatch(deleteMovie(movie._id));
  };

  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.description}</p>
      <p>Watched: {movie.watchStatus ? 'Yes' : 'No'}</p>
      <div className="buttons">
        <button onClick={() => setEditModalOpen(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleToggleWatched}>
          {movie.watchStatus ? 'Mark as Unwatched' : 'Mark as Watched'}
        </button>
      </div>
      {isEditModalOpen && (
        <AddMovieModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          movie={movie}
        />
      )}
    </div>
  );
};

export default MovieCard;
