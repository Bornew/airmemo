import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "./Editor-snow.css";
import Menubar from "./Menubar";
import MarkdownShortcuts from "quill-markdown-shortcuts";
import TagBlot from "./TagBlot";
import QuoteBlot from "./QuoteBlot";
import MagicUrl from "quill-magic-url";
import { CheckCorrect, LinkTwo, Pound, Quote } from "@icon-park/react";
import CustomToolbar from "./Toolbar";

/**
 * register modules
 */
Quill.register("modules/markdownShortcuts", MarkdownShortcuts);
Quill.register("formats/tag", TagBlot);
Quill.register("formats/quote", QuoteBlot);
Quill.register("modules/magicUrl", MagicUrl);

class EditorView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: "",
    };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleClickQuote = this.handleClickQuote.bind(this);
    this.handleClickTag = this.handleClickTag.bind(this);
    this.handleClickTodo = this.handleClickTodo.bind(this);
    this.handleClickClearFormat = this.handleClickClearFormat.bind(this);
    this.registerFormats = this.registerFormats.bind(this);
  }
  componentDidMount() {
    this.registerFormats();
    this.setState({
      editorHtml: "", // trigger update
    });
  }
  componentDidUpdate() {
    this.registerFormats();
  }
  registerFormats() {
    // Ensure React-Quill references is available:
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    // Skip if Quill reference is defined:
    if (this.quillRef != null) return;

    console.log("Registering formats...", this.reactQuillRef);
    const quillRef = this.reactQuillRef.getEditor(); // could still be null

    if (quillRef != null) {
      this.quillRef = quillRef;
      // console.log(Quill.imports)
    }
  }
  checkForTag(content, indexPosition) {
    console.log(indexPosition);
    let tag = /#([^ ]+)\s/;
    let find = content.match(tag);
    console.log("find", find);
    let indexAfterInsertion = indexPosition;
    let updated = false;
    let comment;
    if (find !== null) {
      indexAfterInsertion = indexPosition - find[0].length;
      indexAfterInsertion += find[1].length + 2;
      updated = true;
      let toReplacer =
        '<tag className="custom-tag" title="tag-' +
        find[1] +
        '">' +
        find[1] +
        "</tag>&nbsp;";
      console.log(toReplacer, indexAfterInsertion, indexPosition);
      comment = content.replace(tag, toReplacer);
      this.quillRef.focus();
      this.quillRef.setSelection(indexPosition + 1);
    }
    return { content: comment, updated, indexAfterInsertion };
  }

  handleClickTodo() {
    console.log("this", this, "this.quillRef", this.quillRef);
    const cursorPosition = this.quillRef.getSelection().index;
    if (cursorPosition !== null) {
      this.quillRef.insertText(cursorPosition, "★");
      this.quillRef.setSelection(cursorPosition + 1);
    }
  }
  handleClickTag() {
    const range = this.quillRef.getSelection();
    if (range) {
      const indexAfterInsertion = range.index + range.length;
      if (range.length) {
        this.quillRef.format("tag", true);
        console.log(
          "clickTag index:",
          range.index,
          "length",
          range.length,
          this.state.editorHtml.length
        );
        this.quillRef.setSelection(indexAfterInsertion);
        this.quillRef.focus();
      } else {
        const cursorPosition = this.quillRef.getSelection().index;
        if (cursorPosition !== null) {
          console.log("clickTag index", range.index, "length=0");
          this.quillRef.insertText(cursorPosition, "#");
          this.quillRef.setSelection(cursorPosition + 1);
        }
      }
    }
  }

  handleClickQuote() {
    const cursorPosition = this.quillRef.getSelection().index;
    if (cursorPosition !== null) {
      this.quillRef.formatLine(cursorPosition, 1, "quote", true);
    }
  }

  handleClickClearFormat() {
    const range = this.quillRef.getSelection();
    if(range!==null && range.length){
      this.quillRef.removeFormat(range.index, range.length);
    }
    else{
      this.quillRef.setSelection(range);
    }
  }
  handleChange = (content, delta, source, editor) => {
    let editorHtml = content;
    let quill = this.reactQuillRef.getEditor();
    let newHtml = this.checkForTag(content, quill.getSelection().index);
    if (newHtml.updated === true) {
      editorHtml = newHtml.content;
      console.log("new content", editorHtml);
    }

    this.setState({ editorHtml });
    quill.focus();
  };
  formats = [
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
    "formats/quote",
    "quote",
  ];

  modules = {
    toolbar: {
      container: "#toolbar",
      handlers: {
        handleClickTag: this.handleClickTag.bind(this),
        handleClickTodo: this.handleClickTodo.bind(this),
        handleClickQuote: this.handleClickQuote.bind(this),
        handleClickClearFormat: this.handleClickClearFormat.bind(this),
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

  render() {
    return (
      <div className="editor-snow-wrapper">
        <CustomToolbar
          handleClickTag={this.handleClickTag.bind(this)}
          handleClickQuote={this.handleClickQuote.bind(this)}
          handleClickTodo={this.handleClickTodo.bind(this)}
          handleClickClearFormat={this.handleClickClearFormat.bind(this)}
        />
        <ReactQuill
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={this.modules}
          formats={this.formats}
          ref={(el) => {
            this.reactQuillRef = el;
          }}
          placeholder="Writing is not a way to PRESENT our thoughts, but a way to INSPIRE thinking"
        />
        <Menubar content={this.state.editorHtml} />
      </div>
    );
  }
}

export default EditorView;
