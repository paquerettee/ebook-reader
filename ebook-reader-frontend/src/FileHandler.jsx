import { BACKEND_URL } from "./config";

export function FileUploadHandler() {
  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    postFile(file);
  };

  const postFile = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    fetch(`${BACKEND_URL}upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log("Upload success:", data))
      .catch((err) => console.error("Upload error:", err));
  };

  return (
    <div>
      <label htmlFor="fileUpload" className="custom-upload">
        Upload File
      </label>
      <input type="file" id="fileUpload" style={{ display: "none" }} onChange={uploadFile} />
    </div>
  );
}
