import "./App.css";

import { useState } from "react";
import { EbookList } from "./components/EbookList.jsx";
import { EbookReader } from "./components/EBookReader.jsx";

function App() {
  const [openReader, setOpenReader] = useState(false);
  const [ebookFilename, setEbookFilename] = useState("");

  return !openReader ? (
    <>
      <h1 className="p-4 mb-4">
        <span class="bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">
          read4me
        </span>
      </h1>
      <EbookList setOpenReader={setOpenReader} setEbookFilename={setEbookFilename}></EbookList>
    </>
  ) : (
    <EbookReader ebookFilename={ebookFilename} setOpenReader={setOpenReader}></EbookReader>
  );
}

export default App;
