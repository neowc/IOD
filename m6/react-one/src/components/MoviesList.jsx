import PropTypes from 'prop-types';
function MoviesList() {
    // collection of objects representing movies
    const movies = [
        { id:1, title: "The Shawshank Redemption", year: 1994, synopsis: "Two imprisoned men find redemption.", },
        { id:2, title: "The Dark Knight", year: 2008, synopsis: "Batman fights the menace known as the Joker.", },
        { id:3, title: "Interstellar", year: 2014, synopsis: "Explorers travel through a wormhole in space.", },
    ];
    return (
        <div className="MoviesList componentBox">
            <h2>Movies List</h2>
        <ul>
            {" "}
            {/* iterate over each movie, print the title in a list */}
            {movies.map((movie) => (
                    <Movie
                    key={movie.id}
                    {...movie}
                    />
                ))}
        </ul>
        </div>
    );
}

function Movie({title, year, synopsis}) {
    return (
        <div className="Movie componentBox">
            <li>
            title={title}{" "}
            year={year}{" "}
            synopsis={synopsis}
            </li>
        </div>
    );
};

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    synopsis: PropTypes.string.isRequired,
};

export default MoviesList;
