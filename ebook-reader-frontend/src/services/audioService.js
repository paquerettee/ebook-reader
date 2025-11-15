import { FileHandler } from "../utils/fileHandler";
import { DBHandler } from "../utils/indexedDBHandler";

export const AudioService = {
  async generateAudio(ebookFilename) {
    console.log("generateAudio");
    return FileHandler.generateAudio(ebookFilename);
  },

  async playAudio(ebookFilename) {
    console.log("playAudio: ", ebookFilename);
    let audioUrl;
    try {
      let audioFilename = ebookFilename.replace(/\.[^/.]+$/, ".mp3");
      // audioUrl = await loadAudioBlob(audioFilename);
      audioUrl = await DBHandler.loadFile(audioFilename);
    } catch (err) {
      console.log("Audio not found in indexedDB: ", err);
      const data = await this.generateAudio(ebookFilename);
      if (data) {
        console.log("aufio file: ", data.audio_file);
        const audioBlob = await FileHandler.getAudiobookFile(data.audio_file);
        audioUrl = URL.createObjectURL(audioBlob);
        console.log(audioUrl);
        // audioUrl = await FileHandler.getAudiobookFile(data.audio_file);
      }
    } finally {
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        console.warn("Audio could not be loaded or generated.");
      }
    }
  },

  // check error handling - audio file may be not present
  async deleteAudiobook(audiobookName) {
    console.log("ebookService.deleteAudio: ", audiobookName);
    // delete from local indexedDB
    await DBHandler.deleteFile(audiobookName);
    // delete from backend
    await FileHandler.deleteAudiobook(audiobookName);
    console.log("at the end of ebookService.deleteAudio: ", audiobookName);
  },
};
