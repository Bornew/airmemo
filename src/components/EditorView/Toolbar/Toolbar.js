import React from "react";
import { CheckCorrect, LinkTwo, Pound, Quote, ClearFormat } from "@icon-park/react";
import './Toolbar.css';

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

const CustomClearButton = () => (
  <ClearFormat
    theme="outline"
    size="16"
    fill="#7D7D7D"
    strokeWidth={3}
    strokeLinecap="butt"
  />
)
const CustomToolbar = (props) => {
  const { handleClickTag, handleClickQuote, handleClickTodo, handleClickClearFormat } = props;
  return (
    <div id="toolbar">
      {/*<button className="ql-bold" />*/}
      {/*<button className="ql-image"/>*/}
      {/*<button className="ql-italic" />*/}
      <button className="ql-insertTag ql-toolbar-button" onClick={handleClickTag}>
        <CustomTagButton />
      </button>
      <button className="ql-insertQuote ql-toolbar-button" onClick={handleClickQuote}>
        <CustomQuoteButton />
      </button>
      <button className="ql-insertTodo ql-toolbar-button" onClick={handleClickTodo}>
        <CustomTodoButton />
      </button>
      <button className="ql-clear ql-toolbar-button" onClick={handleClickClearFormat}>
        <CustomClearButton />
      </button>
    </div>
  );
};

export default CustomToolbar;
