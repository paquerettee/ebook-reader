import { uploadFile } from "../utils/fileHandler";

export function FileUploadHandler({ onUploadComplete }) {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    uploadFile(file)
      .then(() => {
        if (onUploadComplete) onUploadComplete();
      })
      .catch((err) => console.error("Upload failed:", err));
  };

  return (
    <div>
      <label htmlFor="fileUpload" className="custom-upload">
        Upload File
      </label>
      <input type="file" id="fileUpload" style={{ display: "none" }} onChange={handleChange} />
    </div>
  );
}
