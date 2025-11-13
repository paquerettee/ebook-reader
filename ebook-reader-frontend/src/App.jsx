import "./App.css";

import { useState } from "react";
import { EbookList } from "./components/EbookList.jsx";
import { EbookReader } from "./components/EBookReader.jsx";

function App() {
  const [openReader, setOpenReader] = useState(false);
  const [ebookFilename, setEbookFilename] = useState("");

  // const openBook = () => {
  //   console.log("openBook");
  //   setOpenReader(true);
  // };

  return !openReader ? (
    <>
      <h1 className="text-blue-600">read4me</h1>
      <p className="read-the-docs">Click to learn more</p>
      <EbookList setOpenReader={setOpenReader} setEbookFilename={setEbookFilename}></EbookList>
    </>
  ) : (
    <EbookReader ebookFilename={ebookFilename} setOpenReader={setOpenReader}></EbookReader>
  );
}

export default App;
