import "./App.css";
import EditorView from "./components/EditorView/EditorView";
import WaterfallView from "./components/WaterfallView";

function App() {
  return (
    <div className="container">
      <div className="topbar">
        <span className="topbar-heading">Just drop your ideas here</span>
      </div>
      <EditorView />
      {/*<TabList/>*/}
      <WaterfallView/>
    </div>
  );
}

export default App;
