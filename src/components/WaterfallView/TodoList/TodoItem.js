import React, { useState, useEffect, useRef } from "react";
import "./TodoItem.css";
import { useHover } from "../../../hooks/useHover";

const TodoItem = (props) => {
  const { title, note, tags, deadline } = props;
  console.log(tags);
  const [ref, active] = useHover();
  return (
    <div className={active ? "todoblot-container--active": "todoblot-container"} ref={ref}>
      <div className="todoblot-left">
        {tags.indexOf("urgent") !== -1 ? (
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

export default TodoItem;
