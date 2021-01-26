import React, { useState } from "react";
import TodoItem from "./TodoItem.js";
import './TodoList.css';
export default () => {
  const todoArr = [
    {
      title: "思考一下Github的形式如何拓展到其他地方",
      note: "some notes",
      tags: ["urgent", "research"],
      deadline: "2021/02/25",
    },
    {
      title: "完成一篇托福",
      note: "some notes",
      tags: ["research"],
      deadline: "2021/02/25",
    },
  ];
  return (
    <div className="todoList-wrapper">
      {todoArr.map((todoItem) => (
        <TodoItem
          title={todoItem.title}
          note={todoItem.note}
          tags={todoItem.tags}
          deadline={todoItem.deadline}
        />
      ))}
    </div>
  );
};
