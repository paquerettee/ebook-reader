import { BACKEND_URL } from "../config.js";
import { AudioButton } from "./ReusableComponents.jsx";
import { saveFile, loadFile } from "../utils/indexedDBHandler.js";
import { useEffect } from "react";

export function Ebook({ data, setOpenReader, setEbookFilename }) {
  const ebookFilename = data;

  useEffect(() => {
    setEbookFilename(ebookFilename);
  }, []);

  const generateAudio = async () => {
    console.log("generateAudio");
    try {
      const response = await fetch(`${BACKEND_URL}generate-audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: ebookFilename }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      const data = await response.json();
      console.log("Audio generated successful:", data);
      return data;
    } catch (err) {
      console.error("Audio generation error:", err);
      return null;
    }
  };

  const getFile = async (filename) => {
    console.log("getFile");
    try {
      const response = await fetch(`${BACKEND_URL}/get-audio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const audioBlob = await response.blob();
      await saveFile(filename, audioBlob);

      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (err) {
      console.error("Fetching file error:", err);
      return null;
    }
  };

  const playAudio = async () => {
    console.log("playAudio: ", ebookFilename);
    let audioUrl;
    try {
      let audioFilename = ebookFilename.replace(/\.[^/.]+$/, ".mp3");
      // audioUrl = await loadAudioBlob(audioFilename);
      audioUrl = await loadFile(audioFilename);
    } catch (err) {
      console.log("Audio not found in indexedDB: ", err);
      const data = await generateAudio();
      if (data) {
        console.log("aufio file: ", data.audio_file);
        audioUrl = await getFile(data.audio_file);
      }
    } finally {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        console.warn("Audio could not be loaded or generated.");
      }
    }
  };

  const deleteFiles = () => {
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
      <AudioButton onClick={playAudio}>Play</AudioButton>
      <AudioButton onClick={deleteFiles}>Delete</AudioButton>
    </div>
  );
}
