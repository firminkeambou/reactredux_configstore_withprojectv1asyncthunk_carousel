import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features_redux/movies/movieSlice";
import MovieListing from "../MovieListing/MovieListing";

//import { addMovies } from "../../features_redux/movies/movieSlice";

function Home() {
  const dispatch = useDispatch();
  //movieText and showText are the  default values  till we use the search bar
  const movieText = "Harry";
  const showText = "Friends";
  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText));
    dispatch(fetchAsyncShows(showText));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img">
        <MovieListing />
      </div>
    </div>
  );
}

export default Home;
