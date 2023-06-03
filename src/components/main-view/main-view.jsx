import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user,token) => {
                        setUser(user);
                        setToken(token);
                    }}/>
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView
                        movie={selectedMovie}

                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>

            ) : movies.length === 0 ? (
                <div>No movies available</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                    <Button
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >Logout</Button>
                </>
            )}
        </Row>
    );


    // if (!user) {
    //     return (
    //         <div>
    //             <LoginView 
    //                 onLoggedIn={(user,token) => {
    //                     setUser(user);
    //                     setToken(token);
    //                 }}
    //             />
    //             <SignupView />
    //         </div>
    //     )
    // }

    // if (selectedMovie) {
    //     let similarMovies = movies.filter((movie) => {
            
    //         if (movie.genre === selectedMovie.genre && movie.title !== selectedMovie.title) {
    //             return movie;
    //         }
    //     });

    //     return (
    //         <div>
    //             <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
    //             <hr />
    //             <h2>Similar Movies</h2>
    //             {similarMovies.map((similarMovie) => (
    //                 <MovieCard 
    //                     key={similarMovie.id}
    //                     movie={similarMovie}
    //                     onMovieClick = {(newSelectedMovie) => {
    //                         setSelectedMovie(newSelectedMovie);
    //                     }}
    //                 />
    //             ))}
    //         </div>
    //     )
    // }

    // if (movies.length === 0) {
    //     return <div>No movies available</div>;
    // }
    

    // return (
    //     <div>
    //         {movies.map((movie) => (
    //             <MovieCard 
    //                 key={movie.id}
    //                 movie={movie}
    //                 onMovieClick = {(newSelectedMovie) => {
    //                     setSelectedMovie(newSelectedMovie);
    //                 }}
    //             />
    //         ))}
    //         <button
    //             onClick={() => {
    //                 setUser(null);
    //                 setToken(null);
    //                 localStorage.clear();
    //             }}
    //         >Logout</button>
    //     </div>
        
    // );
};