import { EbookService } from "../services/ebookService";

export function FileUploadHandler({ onUploadComplete }) {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    EbookService.saveEbook(file)
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
