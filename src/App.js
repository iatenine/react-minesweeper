import "./App.css";
import "./components/Cell";
import { Cell } from "./components/Cell";

function App() {
  return (
    <div>
      <Cell display={"hidden"} />
      <Cell display={"flagged"} />
      <Cell display={"question"} />
      <Cell display={"mine"} />
      <Cell display={4} />
    </div>
  );
}

export default App;
