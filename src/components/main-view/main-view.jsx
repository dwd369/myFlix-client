import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    // get localStorage user and token if available
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = JSON.parse(localStorage.getItem("token"));

    // declare useState
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://dd-myflix.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
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
    }, [token]);

    if (!user) {
        return (
            <div>
                <LoginView 
                    onLoggedIn={(user,token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                <SignupView />
            </div>
        )
    }

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
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >Logout</button>
        </div>
        
    );
};