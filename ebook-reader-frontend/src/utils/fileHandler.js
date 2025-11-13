import { BACKEND_URL } from "../config";
import { saveFile } from "./indexedDBHandler";

export async function uploadAndSaveFile(file) {
  console.log("uploadFile: ", file);
  if (!file) {
    console.log("No file selected");
    return;
  }
  try {
    await postFile(file);
    // save file for further use
    const ebookBlob = new Blob([file], { type: file.type });
    await saveFile(file.name, ebookBlob);
    console.log("File uploaded and saved locally:", file.name);
  } catch (err) {
    console.error("Error uploading/saving file:", err);
  }
}

// POST /upload
async function postFile(file) {
  console.log("postFile: ", file);
  let formData = new FormData();
  formData.append("file", file);
  try {
    let response = await fetch(`${BACKEND_URL}upload`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }
    const data = await response.json();
    console.log("Upload success:", data);
  } catch (err) {
    console.error("Upload error:", err);
  }
}

// GET /ebooks
export async function getEbooks() {
  console.log("FileDownloadHandler, listEbooks");
  try {
    const response = await fetch(`${BACKEND_URL}ebooks`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }
    let data = await response.json();
    console.log("Ebooks list fetched successfully:", data);
    console.log(data.files);
    return data.files || [];
  } catch (err) {
    console.error("Fetching ebooks list failed:", err);
    return [];
  }
}

// POST /get-audio
export async function getFile(filename) {
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
}
