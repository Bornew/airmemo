import ReactQuill, { Quill } from "react-quill";
import "./TagBlot.css";

let Inline = ReactQuill.Quill.import("blots/inline");
class TagBlot extends Inline {
  static create(value) {
    console.log(value);
    let node = super.create();
    node.setAttribute("style", "background: #eef3fe; color: #5783f7;");
    node.setAttribute("title", value.title);

    return node;
  }
  static value(node) {
    return {
      title: node.getAttribute("title"),
      style: node.getAttribute("style"),
    };
  }
}
TagBlot.blotName = "tag";
TagBlot.tagName = "tag";
TagBlot.className = "custom-tag";

export default TagBlot;
