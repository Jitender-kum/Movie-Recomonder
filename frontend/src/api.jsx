import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// Base Configuration
const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US', // Hindi movies chahiye to 'hi-IN' kar sakte ho
  },
});

// Mood ke hisab se Genre IDs (TMDB logic)
// Action: 28, Comedy: 35, Drama: 18, Horror: 27, Romance: 10749
export const fetchMoviesByMood = async (mood) => {
  let genreId = '';

  switch (mood) {
    case 'Happy':
      genreId = '35'; // Comedy
      break;
    case 'Sad':
      genreId = '18'; // Drama
      break;
    case 'Excited':
      genreId = '28'; // Action
      break;
    case 'Chill':
      genreId = '16'; // Animation
      break;
    case 'Romantic':
      genreId = '10749'; // Romance
      break;
    default:
      genreId = '28'; // Default Action
  }

  try {
    const response = await tmdb.get('/discover/movie', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc', // Jo famous hai wo pehle dikhegi
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const BACKEND_URL = 'https://movie-recomonder.onrender.com';

// Register Function
export const registerUser = async (userData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${BACKEND_URL}`, userData, config);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
  }
};

// Login Function
export const loginUser = async (userData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${BACKEND_URL}/login`, userData, config);
    return data;
  } catch (error) {
    throw error.response && error.response.data.message 
      ? error.response.data.message 
      : error.message;
  }
};

// Add/Remove Favorite
export const toggleFavoriteAPI = async (email, movie) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.put(`${BACKEND_URL}/favorite`, { email, movie }, config);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default tmdb;