import { useState, useEffect } from "react";
import { Ebook } from "./Ebook";
import { FileUploadHandler } from "./FileUploadComponent";
import { EbookService } from "../services/ebookService";

export function EbookList({ setOpenReader, setEbookFilename }) {
  const [ebooks, setEbooks] = useState([]);

  const refreshFiles = () => {
    EbookService.getEbooksList().then((files) => {
      setEbooks(files);
    });
  };
  useEffect(() => {
    refreshFiles();
  }, []);

  return (
    <>
      <ul className="ebook-list flex flex-col justify-center gap-1">
        {ebooks.map((ebook, index) => (
          // fixme!!! index not a good key for dynamic arrays
          <li key={index}>
            <Ebook
              data={ebook}
              setOpenReader={setOpenReader}
              setEbookFilename={setEbookFilename}
              refreshFiles={refreshFiles}
            />
          </li>
        ))}
      </ul>
      <FileUploadHandler onUploadComplete={refreshFiles}></FileUploadHandler>
    </>
  );
}
