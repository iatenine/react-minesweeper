import "./App.css";
import "./components/Cell";
import { Cell } from "./components/Cell";

function App() {
  return (
    <div
      style={{
        display: "flex",
        overflow: "scroll",
      }}
    >
      <Cell display={"hidden"} contains={"mine"} />
      <Cell display={"hidden"} contains={1} />
      <Cell display={"hidden"} />
      <Cell display={"flagged"} />
      <Cell display={"question"} />
      <Cell display={"mine"} />
      <Cell display={4} />
      <Cell display={"empty"} />
    </div>
  );
}

export default App;
