import PropTypes from "prop-types";
import { Button, Form, FloatingLabel } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col} from "react-bootstrap";

export const ProfileView = ( {user, token, movies, updateUser} ) => {
    
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [birthday, setBirthday] = useState(null);

    let favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));

    let handleSubmit = (event) => {
        event.preventDefault();

        // store user input
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        // validate and send request with user data
        fetch(`https://dd-myflix.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (response.ok) {
                alert("Your profile has been updated");
                updateUser(user);
                window.location.reload();
            } else {
                alert("Your profile failed to update");
            }
        })
    }


    let handleRemoveAccount = (event) => {
        

        fetch(`https://dd-myflix.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
            if (response.ok) {
                alert("Your account has been deleted");
                updateUser(null);
                window.location.reload();
            } else {
                alert("Failed to delete account");
            }
        })
    }

    return (
    
        <div>
        <Row className="justify-content-start" md={3}>
            <Form onSubmit={handleSubmit}>
                <h2 className="mt-5 mb-4">Account Information</h2>
                {/* Username */}
                <Form.Group className="mb-3" controlId="formUsername">
                    <FloatingLabel
                        controlId="formUsername"
                        label="Username"
                    >
                    <Form.Control
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        defaultValue={user.Username}
                        require
                    />
                    </FloatingLabel>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3" controlId="formEmail">
                    <FloatingLabel
                        controlId="formEmail"
                        label="Email"
                    >    
                    <Form.Control
                        type="email"
                        defaultValue={user.Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    </FloatingLabel>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3"  controlId="formPassword">
                    <FloatingLabel
                        controlId="formPassword"
                        label="Password"
                    >    
                    <Form.Control
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </FloatingLabel>
                </Form.Group>

                {/* Birthday */}
                <Form.Group className="mb-3"  controlId="formBirthday">
                    <FloatingLabel
                        controlId="formBirthday"
                        label="Birthday"
                    >
                    <Form.Control
                        type="text"
                        defaultValue={new Date(user.Birthday).toLocaleDateString()}
                        placeholder=""
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        
                    />
                    </FloatingLabel>
                </Form.Group>
            
                <Button variant="primary" type="submit" >Update</Button>
                
                <Button variant="secondary" type="submit" onClick={handleRemoveAccount}>Remove account permanently</Button>
                
                
            </Form>
            </Row>
            <Row>
            {/* Favorite Movies */}
                {favoriteMovies.length === 0 ? (
                    <Col>No favorite movies added yet.</Col>
                ) : (
                    <>
                        <h2 className="mt-5 mb-4">Favorite Movies</h2>
                        {favoriteMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                                user={user}
                                token={token}
                                movie={movie}
                                updateUser={updateUser}
                            />
                        </Col>
                    ))}
                    </>
                )}
        </Row>
        </div>
    )
}