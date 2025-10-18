import "./App.css";
import { FileUploadHandler } from "./FileHandler";
import { EbookList } from "./EbookList";

function App() {
  return (
    <>
      <h1 className="text-blue-600">read4me</h1>
      <p className="read-the-docs">Click to learn more</p>
      <FileUploadHandler></FileUploadHandler>
      <EbookList></EbookList>
    </>
  );
}

export default App;
