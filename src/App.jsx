import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import SeachIcon from './assets/search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=9648e8fa';


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [movies, setMovies] = useState([]);

  const searchMovies = async(title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title ? title : 'Batman'}`);
      if (!response.ok) {
        throw new Error('Network response was not okay')
      }
      const data = await response.json();
      if (data.Error) {
        throw new Error(data.Error);
      }
      setMovies(data.Search);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    searchMovies();
  }, [])

  return (
    <div
    className='app'
    >
      <h1>MovieLand</h1>

      <div
      className='search'
      >
        <input type="text" placeholder='Search for movies'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SeachIcon} alt="Search" 
        onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
          <div
          className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie}/>
          ))}
          </div>
        ) : (
        <div className='empty'>
          <h2>No movies found</h2>
        </div>
        )}
    </div>
  )}

export default App
