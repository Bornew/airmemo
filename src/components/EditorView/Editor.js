import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./Editor-snow.css";
import Menubar from "./Menubar";

const Editor = (props) => {
  const [editorHtml, setEditorHtml] = useState("");
  const handleChange = (html) => {
    setEditorHtml(html);
  };
  const modules = {
    toolbar: [
      ["blockquote"],
      // [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
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
  ];
  return (
    <div className='editor-snow-wrapper'>
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={editorHtml}
        modules={modules}
        formats={formats}
        // bounds={'.app'}
        placeholder="Writing is not a way to PRESENT our thoughts, but a way to INSPIRE thinking"
      />
      <Menubar content={editorHtml}/>
    </div>
  );
};

export default Editor;
