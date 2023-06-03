// import prop-types module
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100" onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src={movie.imageURL} style={{ cursor: "pointer" }} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
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
    onMovieClick: PropTypes.func.isRequired
};