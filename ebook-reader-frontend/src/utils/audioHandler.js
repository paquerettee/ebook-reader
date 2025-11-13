import { BACKEND_URL } from "../config";
import { loadFile } from "../utils/indexedDBHandler.js";
import { getFile } from "../utils/fileHandler.js";

export async function generateAudio(ebookFilename) {
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
}

export async function playAudio(ebookFilename) {
  console.log("playAudio: ", ebookFilename);
  let audioUrl;
  try {
    let audioFilename = ebookFilename.replace(/\.[^/.]+$/, ".mp3");
    // audioUrl = await loadAudioBlob(audioFilename);
    audioUrl = await loadFile(audioFilename);
  } catch (err) {
    console.log("Audio not found in indexedDB: ", err);
    const data = await generateAudio(ebookFilename);
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
}
