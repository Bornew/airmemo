import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "./Editor-snow.css";
import Menubar from "./Menubar";
import { LinkTwo, CheckCorrect, Quote, Pound } from "@icon-park/react";
import MarkdownShortcuts from "quill-markdown-shortcuts";
import TagBlot from "./TagBlot";
import MagicUrl from "quill-magic-url";
import CustomToolbar from "./Toolbar";

/**
 * register modules
 */
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);
Quill.register("formats/tag", TagBlot);
Quill.register("modules/magicUrl", MagicUrl);

/*
 * Event handler to be attached using Quill toolbar module
 * https://quilljs.com/docs/modules/toolbar/
 */
function checkForTag(content, indexPosition) {
  // let quill = Editor.reactQuillRef.getEditor();
  // console.log('quill', quill);
  let tag = /#(\w+)\s/;
  let find = content.match(tag);
  console.log('find', find);
  let indexAfterInsertion = indexPosition;
  let updated = false;
  let comment;
  if (find !== null) {
    indexAfterInsertion = indexPosition - find[0].length;
    indexAfterInsertion += find[1].length + 2;
    updated = true;
    let toReplacer =
      '<tag className="custom-tag" style="background: #eef3fe; color: #5783f7;" title="tag-' +
      find[1] +
      '">' +
      find[1] +
      "</tag>&nbsp;";
    console.log(toReplacer, indexAfterInsertion);
    comment = content.replace(/#(\w+)\s/, toReplacer);
    //quill.focus();
    //quill.setSelection(indexAfterInsertion, 0, Editor.reactQuillRef);
    // quill.setSelection(indexAfterInsertion + 1);
  }
  return { content: comment, updated, indexAfterInsertion };
}

function insertTodo() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}
function insertTag() {
  // const range = this.quill.getSelection();
  // if (range) {
  //   console.log(range.index + range.length + 2);
  //   this.quill.format("tag", true);
  //   console.log(this);
  // }
  const cursorPosition = this.quill.getSelection().index;
  console.log(this);
  this.quill.insertText(cursorPosition, "#");
  this.quill.setSelection(cursorPosition + 1);
}

function insertQuote() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.formatLine(cursorPosition, 1, "blockquote", true);
  this.quill.deleteText(cursorPosition - 2, 2);
}
const Editor = (props) => {
  const [editorHtml, setEditorHtml] = useState("");
  const handleChange = (content) => {
    let editorHtml = content;
    let newHtml = checkForTag(content);
    if (newHtml.updated === true) {
      editorHtml = newHtml.content;
      console.log('new content', editorHtml);
    }
    setEditorHtml(editorHtml);
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
        ref={(el) => { Editor.reactQuillRef = el }}
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
  magicUrl: {
    // Regex used to check URLs during typing
    urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(mailto:[\S]+)|(tel:[\S]+)/,
    // Regex used to check URLs on paste
    globalRegularExpression: /(https?:\/\/|www\.|mailto:|tel:)[\S]+/g,
  },
  markdownShortcuts: {},
};

export default Editor;
