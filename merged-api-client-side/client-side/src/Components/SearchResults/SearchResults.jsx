import React from "react";
import "./SearchResults.css";
import { Link } from "react-router-dom";

function SearchResults({ result, setOpenResult }) {
  return (
    <div className="searchResults">
      <Link to={`/author/${result.username}`} className="links">
        <div
          className="searchResultsWrapper"
          onClick={() => setOpenResult(false)}
        >
          {result?.profilePic ? (
            <img src={result?.profilePic} alt="" className="SearchImg" />
          ) : null}
          <span className="searchName">{result?.username}</span>
        </div>
      </Link>
    </div>
  );
}

export default SearchResults;
