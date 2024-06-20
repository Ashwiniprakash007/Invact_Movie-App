import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get(`${apiUrl}/movies`);
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (movieData) => {
  const response = await axios.post(`${apiUrl}/movies`, movieData);
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async ({ id, movieData }) => {
  const response = await axios.put(`${apiUrl}/movies/${id}`, movieData);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id) => {
  await axios.delete(`${apiUrl}/movies/${id}`);
  return id;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleWatchStatus: (state, action) => {
      const { id, watchStatus } = action.payload;
      const movieToUpdate = state.movies.find((movie) => movie._id === id);
      if (movieToUpdate) {
        movieToUpdate.watchStatus = watchStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex((movie) => movie._id === action.payload._id);
        state.movies[index] = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie._id !== action.payload);
      });
  },
});

export const { toggleWatchStatus } = moviesSlice.actions;

export const selectAllMovies = (state) => state.movies.movies;

export default moviesSlice.reducer;
