import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
    // movie card to display movie cover and details
    // back button to go back to the home screen
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.imageURL} style={{ cursor: "pointer" }} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired
    }).isRequired,
};