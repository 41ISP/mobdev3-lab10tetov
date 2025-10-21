import { useEffect, useState } from "react"
import MovieCard from "../../components/movieCard"
import Stats from "../../components/stats"
import "./SearchCard.css"

const SearchCard = () => {
    const [movieName, setMovieName] = useState("")
    const [movies, setMovies] = useState(undefined)
    const [error, setError] = useState("")

    useEffect(() => {
        console.log(movies)
    }, [movies])
    const handleSearch = async () => {
        try {
            setError("")
            setMovies(undefined)
            const trimmedMovieName = movieName.trim();
            if (trimmedMovieName.length <= 0) return

            const parameters = new URLSearchParams({
                apikey: import.meta.env.VITE_MOVIE_APP_APYKEY, s: movieName, page: 1
            })
            const res = await fetch(`https://www.omdbapi.com/?${parameters.toString()}`)
            const json = await res.json()
            if (json.Response === "False") throw new Error("Не получилось получить фильм")
            setMovies(json);

        } catch (err) {
            setError(err.message)
            console.error(err)
        }
    }
    return (
        <div className="container">
            <div className="header">
                <h1>🎬 Movie Search Results</h1>
                <div className="search-container">
                    <input type="text" className="search-input" placeholder="Search for movies..." value={movieName} onChange={(e) => setMovieName(e.target.value)} />
                    <button onClick={handleSearch} className="search-button">Search</button>
                </div>
                {error && <p>{error}</p>}
                {movies && <Stats {...movies} />}

            </div>
            <div className="movie-grid">
                {movies && movies.Search.map((movie) => <MovieCard key={movie.imdbID}{...movie} />)}
            </div>
        </div>
    )
}
export default SearchCard