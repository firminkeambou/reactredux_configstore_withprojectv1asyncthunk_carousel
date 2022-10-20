import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Settings } from "../../common/settings";
import {
  getAllMovies,
  getAllShows,
} from "../../features_redux/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

function MovieListing() {
  /* var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };*/
  const movies = useSelector(getAllMovies); //getAllmovies is a selector, we could have just, instead of movies typed inline (state)=>state.movies.movies
  const shows = useSelector(getAllShows); //getAllShows is a selector, we could have just, instead of shows typed inline (state)=>state.movies.shows
  const moviePending = useSelector((state) => state.movies.moviePending);
  const showPending = useSelector((state) => state.movies.showPending);
  //console.log("movies free :", movies);
  let renderMovies,
    renderShows = "";
  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error">
        <h3>{movies.error}</h3>
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((show, index) => <MovieCard key={index} data={show} />)
    ) : (
      <div className="shows-error">
        <h3>{shows.error}</h3>
      </div>
    );
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        {moviePending ? (
          <div className="loading"> ...Loading</div>
        ) : (
          <div className="movie-container">
            <Slider {...Settings}> {renderMovies}</Slider>
          </div>
        )}
      </div>
      <div className="show-list">
        <h2>Shows</h2>
        {showPending ? (
          <div className="loading"> ...Loading</div>
        ) : (
          <div className="show-container">
            <Slider {...Settings}>{renderShows}</Slider>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieListing;
