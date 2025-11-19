import { EbookButton } from "./ReusableComponents.jsx";
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
    <div className="flex gap-4 items-baseline justify-between ">
      <p className="text-gray-700">{ebookFilename.replace(/\.[^./]+$/, "")}</p>
      <div className="buttons flex gap-2 ">
        <EbookButton
          onClick={() => {
            setEbookFilename(ebookFilename);
            setOpenReader(true);
          }}
        >
          Read
        </EbookButton>
        <EbookButton onClick={handlePlayAudio}>Play</EbookButton>
        <EbookButton onClick={handleDeleteFiles}>Delete</EbookButton>
      </div>
    </div>
  );
}
