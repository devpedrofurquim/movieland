import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import SeachIcon from './assets/search.svg';
import MovieCard from './MovieCard';
//9648e8fa

const API_URL = 'http://www.omdbapi.com?apikey=9648e8fa';


const App = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const [movies, setMovies] = useState([]);

  const searchMovies = async(title) => {
    const response = await fetch(`${API_URL}&s=${title ? title : 'Batman'}`);
    const data = await response.json();

    setMovies(data.Search);
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
