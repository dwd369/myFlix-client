import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Button, Form, Col } from "react-bootstrap"
// import { SearchBar } from "../search/search";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    // get localStorage user and token if available
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = JSON.parse(localStorage.getItem("token"));

    // declare useState
    const [user, setUser] = useState(storedUser? storedUser: null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const updateUser = user => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user))
    }

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
                })
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.log("error", error);
            })
            ;
    }, [token], [movies]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-left">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />   
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }}/>
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <div>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView
                                        user={user}
                                        token={token}
                                        movies={movies}
                                        updateUser={updateUser}
                                        />
                                    </Col>
                                )}
                            </div>
                        }
                    />

                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>No movies available</Col>
                                ) : (
                                    <Col md={3}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>No movies available</Col>
                                ) : (
                                    <>                                        
                                        <Row>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter a movie"
                                                value={searchInput}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                            />
                                        </Row>
                                        
                                        {movies.filter((movie) => (
                                            movie.title.toLowerCase().includes(searchInput.toLowerCase())
                                        ))
                                        .map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={3}>
                                                <MovieCard
                                                    movie={movie} 
                                                    user={user}
                                                    token={token}
                                                    updateUser={updateUser}
                                                />
                                            </Col>
                                        ))

                                        }
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};