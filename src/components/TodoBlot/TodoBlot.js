import React, { useState } from "react";
import "./TodoBlot.css";

const TodoBlot = () => {
  // const {title, note, tags, date} =  props;
  const title = "思考一下Github的形式如何拓展到其他地方";
  const note = "some notes here";
  const tags = ["urgent", "research"];
  const deadline = "2021/02/25";
  return (
    <div className="todoblot-container">
      <div className="todoblot-left">
        {tags.indexOf("action hooks: urgent") !== -1 ? (
          <div className="todoblot-circle--active" />
        ) : (
          <div className="todoblot-circle" />
        )}
        <div className="todoblot-title">{title}</div>
      </div>
      <div className="todoblot-right">
        {tags.map((tag) => (
          <div className="todoblot-tag">{tag}</div>
        ))}
        <div className="todoblot-deadline">{deadline}</div>
      </div>
    </div>
  );
};

export default TodoBlot;
