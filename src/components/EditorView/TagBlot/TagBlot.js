import ReactQuill, { Quill } from "react-quill";
import "./TagBlot.css";

let Inline = Quill.import("blots/inline");
class TagBlot extends Inline {
  static create(value) {
    console.log('value', value);
    let node = super.create();
    node.setAttribute("style", "");
    // node.setAttribute("title", value.title);

    return node;
  }
  static value(node) {
    return {
      // title: node.getAttribute("title"),
      style: node.getAttribute("style"),
    };
  }
}
TagBlot.blotName = "tag";
TagBlot.tagName = "tag";
TagBlot.className = "custom-tag";

export default TagBlot;
