import "./App.css";

import { useState } from "react";
import { EbookList } from "./components/EbookList.jsx";
import { EbookReader } from "./components/EBookReader.jsx";

function App() {
  const [openReader, setOpenReader] = useState(false);
  const [ebookFilename, setEbookFilename] = useState("");

  return !openReader ? (
    <>
      <h1 className="p-4 mb-4 text-blue-600">read4me</h1>
      <EbookList setOpenReader={setOpenReader} setEbookFilename={setEbookFilename}></EbookList>
    </>
  ) : (
    <EbookReader ebookFilename={ebookFilename} setOpenReader={setOpenReader}></EbookReader>
  );
}

export default App;
