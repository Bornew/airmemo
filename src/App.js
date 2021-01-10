import "./App.css";
import Editor from './components/EditorView';
import WaterfallView from "./components/WaterfallView";

function App() {
  return (
    <div className="container">
      <div className="topbar">
        <span className="topbar-heading">Just drop your ideas here</span>
      </div>
      <Editor />
      <WaterfallView/>
    </div>
  );
}

export default App;
