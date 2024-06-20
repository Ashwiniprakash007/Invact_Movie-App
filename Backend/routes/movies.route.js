// routes/movies.js
const express = require('express');
const router = express.Router();
const Movie = require('../modal/movie');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new movie
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    description: req.body.description,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    watchStatus: req.body.watchStatus,
    rating: req.body.rating,
    reviews: req.body.reviews
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a movie
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a movie
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// PATCH /movies/:id/watchStatus
router.patch('/:id/watchStatus', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    movie.watchStatus = req.body.watchStatus; // Assuming watchStatus is a boolean field

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add/Edit rating and review
router.patch('/:id/rating', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    movie.rating = req.body.rating;
    movie.reviews = req.body.reviews;
    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
