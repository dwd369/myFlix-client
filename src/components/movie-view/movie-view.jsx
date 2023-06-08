import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies }) => {   
    // pull movieId from URL param
    // match movie based on the URL param which is movieId 
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

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
            <Link to={"/"}>
                <Button>Back</Button>
            </Link>
        </div>
    );
};
