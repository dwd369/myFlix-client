import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MovieCard = ({ movie, user, token, updateUser }) => {

    let addFavorite = () => {

        fetch(`https://dd-myflix.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
                // window.location.reload();
            } else {
                console.log(response)
                alert("Failed to add to your favorite movies");
            }
        }).then(user => {
            if (user) {
                alert("Successfully added to your favorite movies");
                updateUser(user);
            }
        }).catch(error => {
            alert(error);
        })
    }

    let removeFavorite = () => {
        fetch(`https://dd-myflix.herokuapp.com/users/${user.Username}/${movie.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(user.Username);
            console.log(movie.id);
            if (response.ok) {
                return response.json()
                // window.location.reload();
            } else {
                console.log(response)
                alert("Failed to remove movie");
            }
        }).then(user => {
            if (user) {
                alert("Successfully removed movie from favorite.");
                updateUser(user);
            }
        }).catch(error => {
            alert(error);
        })
    }

    // movie card to display movie cover and details
    // back button to go back to the home screen
    return (
        <Card className="h-100">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Card.Img variant="top link" src={movie.imageURL} style={{ cursor: "pointer" }} />
            </Link>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button onClick={e => {addFavorite()} }>Add to favorite</Button>
                <Button onClick={e => {removeFavorite()} }>Remove favorite</Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired
    }).isRequired,
};