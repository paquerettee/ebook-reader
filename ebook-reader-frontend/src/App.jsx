import "./App.css";
import { HandleFileUpload } from "./FileHandler";

function App() {
  return (
    <>
      <h1 className="text-blue-600">read4me</h1>
      <p className="read-the-docs">Click to learn more</p>
      <HandleFileUpload></HandleFileUpload>
    </>
  );
}

export default App;
