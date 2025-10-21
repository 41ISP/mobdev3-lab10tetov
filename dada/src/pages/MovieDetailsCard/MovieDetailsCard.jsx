import { useEffect, useState } from "react"
import "./MovieDetailsCard.css"
import { Link, useParams } from "react-router-dom"

const MovieDetailsCard = () => {
    const [movie, setMovie] = useState(undefined)
    const { id } = useParams()
    useEffect(() => {
        const handleSearch = async () => {
            try {
                const parameters = new URLSearchParams({
                    apikey: import.meta.env.VITE_MOVIE_APP_APYKEY, i: id
                })
                const res = await fetch(`https://www.omdbapi.com/?${parameters.toString()}`)
                const json = await res.json()
                if (json.Response === "False") throw new Error("Не получилось получить фильм")
                setMovie(json);
                console.log(json);
            } catch (err) {
                console.error(err)
            }
        }
        handleSearch();
    }, [])
    return (
        <div className="container">
            <Link to="/" className="back-button">← Back to Search</Link>

            {movie && <div className="movie-detail-card">
                <div className="movie-header">
                    <div className="poster-section">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="poster-image" />
                        <div className="rating-badge">{movie.imdbRating} ⭐</div>
                    </div>

                    <div className="info-section">
                        <h1 className="movie-title">{movie.Title}</h1>
                        <div className="movie-tagline">
                            <span className="tag">{movie.Year}</span>
                            <span className="tag rated">{movie.Rated}</span>
                            <span className="tag">{movie.Runtime}</span>
                            <span className="tag">{movie.Genre}</span>
                        </div>

                        <div className="movie-meta">
                            <div className="meta-item">
                                <span className="meta-label">Released:</span>
                                <span className="meta-value">{movie.Released}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Language:</span>
                                <span className="meta-value">{movie.Language}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Country:</span>
                                <span className="meta-value">
                                    {movie.Country}
                                </span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">IMDb ID:</span>
                                <span className="meta-value">{movie.imdbID}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="movie-body">
                    <div className="section">
                        <h2 className="section-title">Plot Summary</h2>
                        <p className="plot-text">
                            {movie.Plot}
                        </p>
                    </div>

                    <div className="section">
                        <h2 className="section-title">Cast & Crew</h2>
                        <div className="info-grid">
                            <div className="info-box">
                                <div className="info-box-title">Director</div>
                                <div className="info-box-content">
                                    {movie.Director}
                                </div>
                            </div>
                            <div className="info-box">
                                <div className="info-box-title">Writer</div>
                                <div className="info-box-content">
                                    {movie.Writer}
                                </div>
                            </div>
                            <div className="info-box">
                                <div className="info-box-title">Actors</div>
                                <div className="info-box-content">
                                    {movie.Actors}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Ratings & Reviews</h2>
                        <div className="ratings-container">
                            {movie.Ratings.map((e) => (
                                < div className="rating-box" >
                                    <div className="rating-source">{e.Source}</div>
                                    <div className="rating-value">{e.Value} </div>
                                </div>
                            ))}
                        </div>
                        <div className="awards-box">
                            <div className="awards-icon">🏆</div>
                            <div className="awards-text">
                                {movie.Awards}
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <h2 className="section-title">Box Office & Statistics</h2>
                        <div className="box-office-section">
                            <div className="box-office-card">
                                <div className="box-office-label">Box Office</div>
                                <div className="box-office-value">{movie.BoxOffice}</div>
                            </div>
                            <div className="box-office-card">
                                <div className="box-office-label">IMDb Votes</div>
                                <div className="box-office-value">{movie.imdbVotes}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            }
        </div >
    )
}
export default MovieDetailsCard