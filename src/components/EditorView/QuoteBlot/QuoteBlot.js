import ReactQuill, { Quill } from "react-quill";
import "./QuoteBlot.css";

let Block = Quill.import("blots/block");

class QuoteBlot extends Block {
  static create(value) {
    console.log("value", value);
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
QuoteBlot.blotName = "quote";
QuoteBlot.tagName = "quote";
QuoteBlot.className = "custom-quote";

export default QuoteBlot;
