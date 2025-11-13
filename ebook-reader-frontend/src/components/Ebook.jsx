import { AudioButton } from "./ReusableComponents.jsx";
import { playAudio } from "../utils/audioHandler.js";
import { useEffect } from "react";

export function Ebook({ data, setOpenReader, setEbookFilename }) {
  const ebookFilename = data;

  useEffect(() => {
    setEbookFilename(ebookFilename);
  }, []);

  const handlePlayAudio = () => {
    playAudio(ebookFilename);
  };

  const handleDeleteFiles = () => {
    console.log("deleteFiles");
  };

  return (
    <div className="flex gap-3">
      <p className="text-black">{data}</p>
      <AudioButton
        onClick={() => {
          setEbookFilename(ebookFilename);
          setOpenReader(true);
        }}
      >
        Read
      </AudioButton>
      <AudioButton onClick={handlePlayAudio}>Play</AudioButton>
      <AudioButton onClick={handleDeleteFiles}>Delete</AudioButton>
    </div>
  );
}
