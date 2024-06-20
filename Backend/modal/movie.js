// model/movie.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  genre: { type: String, required: true },
  watchStatus: { type: Boolean, default: false },
  rating: { type: Number, min: 0, max: 10 },
  reviews: { type: String }
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;