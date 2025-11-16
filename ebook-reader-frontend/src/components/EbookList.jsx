import { useState, useEffect } from "react";
import { Ebook } from "./Ebook";
import { FileUploadComponent } from "./FileUploadComponent";
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
    <section className="w-full max-w-sm mx-auto">
      <ul className="ebook-list flex flex-col items-between gap-2 w-100">
        {/* <div class="w-full max-w-sm"> */}
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
      <FileUploadComponent onUploadComplete={refreshFiles}></FileUploadComponent>
    </section>
  );
}
