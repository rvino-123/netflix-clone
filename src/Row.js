import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // A snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    //for use effect, if any variable is being pulled into the useEffect YOU MUST INCLUDE INSIDE THE ARRAY.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log("ROWJS");
      console.log(request);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); //depending on movies changes so needs to run SEEL LINE 10

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    console.table(movie?.title);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);

          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_poster_large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => handleClick(movie)}
          /> //doesn't work, ebecau
        ))}
      </div>
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}</div>
    </div>
  );
}

export default Row;
