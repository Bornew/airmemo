import React from "react";
import {CheckCorrect, LinkTwo, Pound, Quote} from "@icon-park/react";

const CustomTagButton = () => (
  <Pound
    theme="outline"
    size="16"
    fill="#7D7D7D"
    strokeWidth={3}
    strokeLinecap="butt"
  />
);
const CustomTodoButton = () => (
  <CheckCorrect
    theme="outline"
    size="16"
    fill="#7D7D7D"
    strokeWidth={3}
    strokeLinecap="butt"
  />
);
const CustomLinkButton = () => (
  <LinkTwo
    theme="outline"
    size="16"
    fill="#7D7D7D"
    strokeWidth={3}
    strokeLinecap="butt"
  />
);

const CustomQuoteButton = () => (
  <Quote
    theme="outline"
    size="16"
    fill="#7D7D7D"
    strokeWidth={3}
    strokeLinecap="butt"
  />
);

const CustomToolbar = () => (
  <div id="toolbar">
    {/*<button className="ql-bold" />*/}
    {/*<button className="ql-image"/>*/}
    {/*<button className="ql-italic" />*/}
    <button className="ql-insertTag">
      <CustomTagButton />
    </button>
    <button className="ql-blockquote">
      <CustomQuoteButton />
    </button>
    <button className="ql-insertLink">
      <CustomLinkButton />
    </button>
    <button className="ql-insertTodo">
      <CustomTodoButton />
    </button>
  </div>
);

export default CustomToolbar;