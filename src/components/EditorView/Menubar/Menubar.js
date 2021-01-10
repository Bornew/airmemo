import React, { useState, useEffect } from "react";
import "./Menubar.css";

const Menubar = (props) => {
  const { content } = props;
  const submitContent = () => {
    console.log("submit", content);
  };
  return (
    <div className="editor-menubar">
      <div className="editor-menubar-left"></div>
      <div className="editor-menubar-right">
        <button
          className="submit-btn"
          disabled={content === "" || content === emptyContent ? true : false}
          onClick={submitContent}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

const emptyContent = "<p><br></p>";

export default Menubar;
