import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./NoResult.css";

function NoResult({ setOpenResult }) {
  return (
    <div className="noResults">
      <div className="noResultsWrapper">
        <div className="closeIcon" onClick={() => setOpenResult(false)}>
          <CloseOutlinedIcon />
        </div>
        <span className="results">No Results Found</span>
      </div>
    </div>
  );
}

export default NoResult;
