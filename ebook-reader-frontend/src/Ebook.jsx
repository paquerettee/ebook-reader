import { BACKEND_URL } from "./config";
import { AudioButton } from "./ReusableComponents";

export function Ebook({ data }) {
  console.log("Ebook: ", data);
  const ebookFilename = data;

  const openBook = () => {
    console.log("openBook");
  };

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
      // streaming
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      // downloading
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = filename;
      document.body.appendChild(link); // Required for Firefox
      link.click();
      document.body.removeChild(link);
      // return object for immediate playback
      return audioUrl;
    } catch (err) {
      console.error("Fetching file error:", err);
      return null;
    }
  };

  const playAudio = async () => {
    console.log("playAudio");
    // check if local copy exists, if no - generate and download audio file
    // if (!localStorage.getItem(filename)) {
    //   // fetch and download
    //   localStorage.setItem(filename, "true");
    // }

    const data = await generateAudio();
    if (data) {
      const audioUrl = await getFile(data.audio_file);
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    }
  };

  return (
    <div className="flex gap-3">
      <p className="text-black">{data}</p>
      <AudioButton onClick={openBook}>Read</AudioButton>
      <AudioButton onClick={playAudio}>Play</AudioButton>
    </div>
  );
}
