import { useState, useEffect } from "react";
import { Ebook } from "./Ebook";
import { FileUploadHandler } from "./FileUploadComponent";
import { downloadFiles } from "../utils/FileHandler";

export function EbookList({ setOpenReader, setEbookFilename }) {
  const [ebooks, setEbooks] = useState([]);

  const refreshFiles = () => {
    downloadFiles().then((files) => {
      console.log(files);
      setEbooks(files);
    });
  };
  useEffect(() => {
    console.log("frontend, listEbooks");
    refreshFiles();
  }, []);

  return (
    <>
      <ul className="ebook-list flex flex-col justify-center gap-1">
        {ebooks.map((ebook, index) => (
          // fixme!!! index not a good key for dynamic arrays
          <li key={index}>
            <Ebook data={ebook} setOpenReader={setOpenReader} setEbookFilename={setEbookFilename} />
          </li>
        ))}
      </ul>
      <FileUploadHandler onUploadComplete={refreshFiles}></FileUploadHandler>
    </>
  );
}
