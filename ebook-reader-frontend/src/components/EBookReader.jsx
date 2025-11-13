import { useState, useEffect } from "react";
import { loadFile } from "../utils/indexedDBHandler";
import { AudioButton } from "./ReusableComponents";

export function EbookReader({ ebookFilename, setOpenReader }) {
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    console.log("Reader: ", ebookFilename);
    async function fetchEbook() {
      console.log("loading file: ", ebookFilename);
      // FIXME - file not found
      const ebookText = await loadFile(ebookFilename, true);
      console.log(ebookText);
      setTextContent(ebookText);
    }
    fetchEbook();
  }, []);

  return (
    <>
      <h1>Book title here or something</h1>
      <div className="ebook-reader">
        {/* <input type="file" accept=".txt" onChange={handleFileChange} /> */}
        <h2>Reader</h2>
        <div className="text-display">
          <pre>{textContent}</pre>
        </div>
      </div>
      <AudioButton onClick={() => setOpenReader(false)}>Back</AudioButton>
    </>
  );
}
