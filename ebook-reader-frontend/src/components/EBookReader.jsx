import { useState, useEffect } from "react";
import { EbookService } from "../services/ebookService";
import { AudioButton } from "./ReusableComponents";

export function EbookReader({ ebookFilename, setOpenReader }) {
  const [textContent, setTextContent] = useState("");

  useEffect(() => {
    console.log("Reader: ", ebookFilename);
    async function fetchEbook() {
      const ebookText = EbookService.getEbook(ebookFilename);
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
