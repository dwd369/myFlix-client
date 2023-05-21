import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://dd-myflix.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre.Name,
                        director: movie.Director,
                        imageURL: movie.ImageURL,
                        releaseYear: movie.RealeaseYear
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        )
    }

    if (movies.length === 0) {
        return <div>No movies available</div>;
    }
    

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id}
                    movie={movie}
                    onMovieClick = {(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
            />
            ))}
        </div>
        
    );
};