import React, { useState, useEffect } from "react";
import "./EditorBlock.css";

const EditorBlock = (props) => {
  //这里的逻辑是，原先有placeholder，光标点击，开始输入之后，全部清空，显示另一种样式
  const placeholderText = ' Writing is not a way to PRESENT our thoughts, but a way to INSPIRE thinking';
  const [editorContent, setEditorContent] = useState('');

  return (
    <div className="editor-input" contenteditable="true" data-placeholder = {placeholderText}>
    </div>
  );
};

export default EditorBlock;
