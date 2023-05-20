import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            "_id":{"$oid":"6455e4ed11172342e053fc70"},
            "Title":"The Matrix Reloaded",
            "Description":"Freedom fighters Neo, Trinity and Morpheus continue to lead the revolt against the Machine Army, unleashing their arsenal of extraordinary skills and weaponry against the systematic forces of repression and exploitation.",
            "Genre":{
                "Name":"Sci-fi",
                "Description":"Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies."
            },
            "Director":{
                "_id":{"$oid":"6458a87270c16610a626aeb1"}
            },
            "ImageURL":"https://m.media-amazon.com/images/M/MV5BODE0MzZhZTgtYzkwYi00YmI5LThlZWYtOWRmNWE5ODk0NzMxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            "Featured":false,
            "Bio":"Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. After the siblings dropped out of college, they started a construction business and wrote screenplays.",
            "RealeaseYear":2003
        },
        {
            "_id":{"$oid":"6455ce37b7428c12f84edef9"},
            "Title":"The Matrix",
            "Description":"Neo (Keanu Reeves) believes that Morpheus (Laurence Fishburne), an elusive figure considered to be the most dangerous man alive, can answer his question -- What is the Matrix? Neo is contacted by Trinity (Carrie-Anne Moss), a beautiful stranger who leads him into an underworld where he meets Morpheus. They fight a brutal battle for their lives against a cadre of viciously intelligent secret agents. It is a truth that could cost Neo something more precious than his life.",
            "Genre":{
                "Name":"Sci-fi",
                "Description":"Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies."
            },
            "Director":{"_id":{"$oid":"6458a87270c16610a626aeb1"}},
            "ImageURL":"https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            "Featured":false,
            "Actors":["Keanu Reeves"],
            "RealeaseYear":1999
        },
        {
            "_id":{"$oid":"6455e4ed11172342e053fc71"},
            "Title":"The Matrix Revolutions",
            "Description":"The human city of Zion defends itself against the massive invasion of the machines as Neo fights to end the war at another front while also opposing the rogue Agent Smith.",
            "Genre":{
                "Name":"Sci-fi",
                "Description":"Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies."
            },
            "Director":{"_id":{"$oid":"6458a87270c16610a626aeb1"}},
            "ImageURL":"https://m.media-amazon.com/images/M/MV5BNzNlZTZjMDctZjYwNi00NzljLWIwN2QtZWZmYmJiYzQ0MTk2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
            "Featured":false,
            "Bio":"Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. After the siblings dropped out of college, they started a construction business and wrote screenplays.","RealeaseYear":{"$numberInt":"2003"}
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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
                    key={movie._id}
                    movie={movie}
                    onMovieClick = {(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
            />
            ))}
        </div>
        
    );
};