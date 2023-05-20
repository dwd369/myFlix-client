export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImageURL} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Drescription: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director._id.$oid}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};