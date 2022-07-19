import React, {useState, useEffect, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [starwarsData, setStarWarsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const  fetchDataHandler  =  useCallback ( async () => {
    setError("");
    try {
      setIsLoading(true);
      const response  = await fetch('https://swapi.dev/api/films/');

      if (!response.ok) {
        throw new Error ("Something went wrong...");
      }

      console.log('first step');
      const data = await response.json();
      console.log('2 step');
      console.log(data);
      const finalMoviesList = data.results.map(movie => {
        return {
          id : movie.episode_id,
          title : movie.title,
          releaseDate : movie.releaseDate,
          openingText : movie.opening_crawl
        }
      });
      setStarWarsData(finalMoviesList);
      setIsLoading(false);

    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }    
  }, []) ;
   


  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && starwarsData.length> 0 && <MoviesList movies={starwarsData} />}
        {!isLoading && starwarsData.length === 0 && !error && <p>Found No Movies.</p>}
        {isLoading && <p>Loading data...</p>}
        {!isLoading && error.length > 0 && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
