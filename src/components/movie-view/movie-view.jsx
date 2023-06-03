import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img className="w-100" src={movie.imageURL} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Drescription: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Release Year: </span>
                <span>{movie.releaseYear}</span>
            </div>
            <Button onClick={onBackClick}>Back</Button>
        </div>
    );
};
