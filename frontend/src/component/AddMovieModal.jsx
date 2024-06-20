import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, updateMovie  } from '../Redux/actions';
import './scss/AddMovieModal.scss';

const AddMovieModal = ({ isOpen, onClose, movie }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [watchStatus, setWatchStatus] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
      setRating(movie.rating);
      setReviews(movie.reviews);
      setWatchStatus(movie.watchStatus);
    }
  }, [movie]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (movie) {
        await dispatch(updateMovie({ id: movie._id, movieData: { title, description, releaseYear, genre, rating, reviews, watchStatus } })).unwrap();
      } else {
        await dispatch(addMovie({ title, description, releaseYear, genre, rating, reviews, watchStatus })).unwrap();
      }
      setTitle('');
      setDescription('');
      setReleaseYear('');
      setGenre('');
      setRating(0);
      setReviews('');
      setWatchStatus(false);
      onClose();
    } catch (error) {
      console.error('Error adding/updating movie:', error);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          
          <label>Release Year:</label>
          <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} required />
          
          <label>Genre:</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
          
          <label>Watched:</label>
          <input type="checkbox" checked={watchStatus} onChange={(e) => setWatchStatus(e.target.checked)} />
          
          <label>Rating:</label>
          <input type="number" value={rating} max={5} min={1} onChange={(e) => setRating(e.target.value)} required />
          
          <label>Reviews:</label>
          <textarea value={reviews} onChange={(e) => setReviews(e.target.value)} />
          
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
