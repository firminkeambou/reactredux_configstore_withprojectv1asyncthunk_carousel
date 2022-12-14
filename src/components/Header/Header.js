import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// display images
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features_redux/movies/movieSlice";

import user from "../../images/user.png";
import "./Header.scss";

function Header() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault(); //prevent the page to be reset while submiting the form
    //console.log(term);
    if (term === "") return alert("Please enter search term!");
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  //component Link invoke the "a" tag; so the css on <a> affects the Link component
  return (
    <div className="header">
      <div className="logo">
        {" "}
        <Link to="/">Movie App</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>{" "}
          {/**fa fa-search comes from font awesome */}
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
}

export default Header;
