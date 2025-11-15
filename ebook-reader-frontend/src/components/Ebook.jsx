import { AudioButton } from "./ReusableComponents.jsx";
import { EbookService } from "../services/ebookService";
import { AudioService } from "../services/audioService";
import { useEffect } from "react";

export function Ebook({ data, setOpenReader, setEbookFilename, refreshFiles }) {
  const ebookFilename = data;

  useEffect(() => {
    setEbookFilename(ebookFilename);
  }, []);

  const handlePlayAudio = () => {
    AudioService.playAudio(ebookFilename);
  };

  const handleDeleteFiles = async () => {
    let audiobookFilename = ebookFilename.replace(/\.[^/.]+$/, ".mp3");
    await AudioService.deleteAudiobook(audiobookFilename);
    // TODO: if audio deleted successfully - delete ebook?
    await EbookService.deleteEbook(ebookFilename);
    refreshFiles();
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
