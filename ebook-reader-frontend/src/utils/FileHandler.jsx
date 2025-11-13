import { BACKEND_URL } from "../config";
import { saveFile } from "./indexedDBHandler";

export async function uploadFile(file) {
  console.log("uploadFile: ", file);
  if (!file) {
    console.log("No file selected");
    return;
  }
  postFile(file);
  // save file for further use
  const ebookBlob = new Blob([file], { type: file.type });
  await saveFile(file.name, ebookBlob);
  // console.log(file.name);
}

function postFile(file) {
  console.log("postFile: ", file);
  let formData = new FormData();
  formData.append("file", file);
  fetch(`${BACKEND_URL}upload`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log("Upload success:", data))
    .catch((err) => console.error("Upload error:", err));
}

export function downloadFiles() {
  console.log("FileDownloadHandler, listEbooks");
  return fetch(`${BACKEND_URL}ebooks`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      // no files found - fixed in backend -> []
      console.log("Ebooks list fetched successfully:", data);
      console.log(data.files);
      return data.files || [];
    })
    .catch((err) => {
      console.error("Fetching ebooks list failed:", err);
      return [];
    });
}
