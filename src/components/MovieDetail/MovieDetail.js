import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAsyncMovieOrShowDetail,
  removeSelectedMovieOrShow,
} from "../../features_redux/movies/movieSlice";
import "./MovieDetail.scss";
function MovieDetail() {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.movies.selectedMovieOrShow);
  console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);
  return (
    <div className="movie-section">
      {Object.keys(data).length === 0 ? (
        <div> ...Loading</div>
      ) : (
        <>
          <div className="section-left">
            <div className="movie-title">{data.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating <i className="fa fa-star"></i> {data.imdbRating}{" "}
                {/** icons comes from font Awsome fa fa-star*/}
              </span>
              <span>
                IMDB Votes <i className="fa fa-thumbs-up"></i> {data.imdbVotes}{" "}
              </span>
              <span>
                Runtime <i className="fa fa-film"></i> {data.Runtime}{" "}
              </span>
              <span>
                Year <i className="fa fa-calendar"></i> {data.Year}{" "}
              </span>
            </div>
            <div className="movie-plot">{data.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{data.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{data.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{data.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{data.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right"></div>
          <img src={data.Poster} alt={data.title} />
        </>
      )}
    </div>
  );
}

export default MovieDetail;
