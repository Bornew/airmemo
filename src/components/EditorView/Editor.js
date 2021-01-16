import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "./Editor-snow.css";
import Menubar from "./Menubar";
import { LinkTwo, CheckCorrect, Quote, Pound } from "@icon-park/react";
import MarkdownShortcuts from "quill-markdown-shortcuts";
import TagBlot from "./TagBlot";

/**
 * register modules
 */
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);
Quill.register("formats/tag", TagBlot);

const CustomStarButton = () => <span className="octicon octicon-star" />;
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
/*
 * Event handler to be attached using Quill toolbar module (see line 73)
 * https://quilljs.com/docs/modules/toolbar/
 */
function checkForTag(content, indexPosition) {
  let tag = /#(\w+)\s/;
  let find = content.match(tag);
  let indexAfterInsertion = indexPosition;
  let updated = false;
  let comment;
  if (find !== null) {
    indexAfterInsertion = indexPosition - find[0].length;
    indexAfterInsertion += find[1].length + 2;
    updated = true;
    let toReplacer =
      '<span style="color:#5783F7; background: #EEF3FE; cursor: pointer; " title="tag-' +
      find[1].toUpperCase() +
      '">' + '#' +
      find[1] +
      "</span>&nbsp;";
    console.log(toReplacer);
    comment = content.replace(/#(\w+)\s/, toReplacer);
  }
  console.log(comment);
  return { content: comment, updated, indexAfterInsertion };
}

function insertTodo() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}
function insertTag() {
  const range = this.quill.getSelection();
  if (range) {
    console.log(range.index + range.length + 2);
    this.quill.format("tag", true);
    this.quill.setSelection(range.index + range.length + 3);
    this.quill.format("tag", false);
  }

}

function formatTag() {
  // this.quill.format("tag", true);
}
function insertQuote() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.formatLine(cursorPosition, 1, "blockquote", true);
  this.quill.deleteText(cursorPosition - 2, 2);
}
const CustomToolbar = () => (
  <div id="toolbar">
    {/*<button className="ql-bold" />*/}
    {/*<button className="ql-image"/>*/}
    {/*<button className=""/>*/}
    {/*<button className="ql-italic" />*/}
    {/*<button className="ql-insertStar">*/}
    {/*  <CustomStarButton />*/}
    {/*</button>*/}
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

const Editor = (props) => {
  const [editorHtml, setEditorHtml] = useState("");
  const handleChange = (content) => {
    let editorHtml = content;
    checkForTag(content);
    let newHtml = checkForTag(content);
    if (newHtml.updated === true) {
      console.log(newHtml);
      editorHtml = newHtml.content;
       // 此处需要将tag内容转变为tag format
    }
    setEditorHtml(editorHtml);
    if(newHtml.updated === true) {
      formatTag();
    }
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "formats/tag",
    "tag",
  ];

  return (
    <div className="editor-snow-wrapper">
      <CustomToolbar />
      <ReactQuill
        onChange={handleChange}
        value={editorHtml}
        modules={Editor.modules}
        formats={formats}
        // bounds={'.app'}
        placeholder="Writing is not a way to PRESENT our thoughts, but a way to INSPIRE thinking"
      />
      <Menubar content={editorHtml} />
    </div>
  );
};

Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertTag: insertTag,
      insertTodo: insertTodo,
      insertQuote: insertQuote,
    },
  },
  clipboard: {
    matchVisual: false,
  },
  markdownShortcuts: {},
};

export default Editor;
