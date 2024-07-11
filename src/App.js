// import logo from "./logo.svg";
import "./App.css";
import DataComponent from "./services/DataComponent";
// import PredictionComponent from "./services/PredictionComponent";
import PredictionComponent2 from "./services/PredictionComponent2";

function App() {
  return (
    <div className="App">
      <DataComponent />
      {/* <PredictionComponent /> */}
      <PredictionComponent2 />
    </div>
  );
}

export default App;
