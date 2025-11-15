import { HttpClient } from "../api/httpClient";

export const FileHandler = {
  // POST /upload
  async uploadEbookFile(file) {
    const response = await HttpClient.handlePostDataRequest("upload", file);
    const data = await response.json();
  },

  // GET /ebooks
  async getEbooksList() {
    const response = await HttpClient.handleGetRequest("ebooks");
    let data = await response.json();
    if (data) {
      console.log("Ebooks list fetched successfully:", data);
      console.log(data.files);
      return data.files || [];
    } else {
      console.error("Fetching ebooks list failed:");
      return [];
    }
  },

  // GET /get-ebook
  async getEbookFile(filename) {
    const response = await HttpClient.handlePostRequest("get-ebook", filename);
    const blobFile = await response.blob();
    return blobFile;
  },

  // POST /get-audio
  async getAudiobookFile(filename) {
    const response = await HttpClient.handlePostRequest("get-audio", filename);
    const blobFile = await response.blob();
    return blobFile;
  },

  // POST /generate-audio
  async generateAudio(ebookFilename) {
    const response = await HttpClient.handlePostRequest("generate-audio", ebookFilename);
    const data = await response.json();
    return data;
  },

  // DELETE /delete-ebook
  async deleteEbook(filename) {
    const response = await HttpClient.handleDeleteRequest("delete-ebook", filename);
  },

  // DELETE /delete-audio
  async deleteAudiobook(filename) {
    const response = await HttpClient.handleDeleteRequest("delete-audio", filename);
  },
};
