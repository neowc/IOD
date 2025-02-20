import PropTypes from 'prop-types';
import { useState } from "react";

function MoviesList() {
    // collection of objects representing movies
    const movies = [
        { id:1, title: "The Shawshank Redemption", year: 1994, synopsis: "Two imprisoned men find redemption.", },
        { id:2, title: "The Dark Knight", year: 2008, synopsis: "Batman fights the menace known as the Joker.", },
        { id:3, title: "Interstellar", year: 2014, synopsis: "Explorers travel through a wormhole in space.", },
    ];

    const [currentMovies, setCurrentMovies] = useState(movies);  //useState( [] );

    const handleAddMovie = (newMovie) => {
        newMovie.id = currentMovies.length + 1; // unreliable but succinct
        setCurrentMovies([...currentMovies, newMovie]);
    }

    return (
        <div className="MoviesList componentBox">
            <h2>Movies List</h2>
        <ul>
            {" "}
            {/* iterate over each movie, print the title in a list */}
            {currentMovies.map((movie) => (
                    <Movie
                    key={movie.id}
                    {...movie}
                    />
                ))}
        </ul>
        <AddMovieForm onAddMovie={handleAddMovie}/>
        </div>
    );
}

function Movie({title, year, synopsis}) {
    return (
        <div className="Movie componentBox">
            {/* <li>
            title={title}{" "}
            year={year}{" "}
            synopsis={synopsis}
            </li> */}
            {title}{" | "}{year}{" | "}{synopsis}
        </div>
    );
};


export function AddMovieForm({onAddMovie}) {
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')

    // ++ add support for the synopsis field as well, here and below
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddMovie({title, year})

        // Creates key-value pair object with form input names/values
        // const data = new FormData(e.target);
        // onAddMovie(Object.fromEntries(data));
    }
    return (
        <div className="AddMovieForm componentBox">
            <form onSubmit={handleSubmit}>
                <label>Movie Title:<input name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>Year Released:<input name="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
                </label>
                <button>Add Movie</button>
            </form>
        </div>
    )
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    synopsis: PropTypes.string.isRequired,
};

AddMovieForm.propTypes = {
    onAddMovie: PropTypes.func.isRequired,
};

export default MoviesList;
