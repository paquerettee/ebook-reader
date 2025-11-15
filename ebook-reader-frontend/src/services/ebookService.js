import { FileHandler } from "../utils/fileHandler";
import { DBHandler } from "../utils/indexedDBHandler";

export const EbookService = {
  async getEbooksList() {
    return FileHandler.getEbooksList();
  },

  async saveEbook(file) {
    console.log("saveEbook: ", file);
    if (!file) {
      console.log("No file selected");
      return;
    }
    try {
      await FileHandler.uploadEbookFile(file);
      // save file for further use
      const ebookBlob = new Blob([file], { type: file.type });
      await DBHandler.saveFile(file.name, ebookBlob);
      console.log("File uploaded and saved locally:", file.name);
    } catch (err) {
      console.error("Error uploading/saving file:", err);
    }
  },

  async getFile(fileName, type = "audio") {
    console.log("EbookService, getFile: ", fileName);
    // try to get the file from local indexedDB
    try {
      const fileContent = await DBHandler.loadFile(fileName, true);
      console.log("fileContent", fileContent);
      return fileContent;
    } catch (err) {
      if (err.name !== "FILE_NOT_FOUND") {
        // It's some other error => rethrow
        console.log("some other error");
        console.log(err);
        throw err;
      }
    }
    // fetch the file from backend
    console.log("EbookService, get from backend");
    const getMethod = type == "audio" ? FileHandler.getAudiobookFile : FileHandler.getEbookFile;
    const blobFile = await getMethod(fileName);
    console.log(blobFile);
    await DBHandler.saveFile(fileName, blobFile);
    const fileUrl = URL.createObjectURL(blobFile);
    return fileUrl;
  },

  async getEbook(ebookName) {
    console.log("ebookService, getEbook: ", ebookName);
    return this.getFile(ebookName, "text");
  },

  async getAudio(audioName) {
    console.log("ebookService, getAudio: ", audioName);
    return this.getFile(audioName, "audio");
  },

  async deleteEbook(ebookName) {
    console.log("ebookService.deleteEbook: ", ebookName);
    // delete from local indexedDB
    await DBHandler.deleteFile(ebookName);
    // delete from backend
    await FileHandler.deleteEbook(ebookName);
  },
};
