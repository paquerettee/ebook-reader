import { EbookService } from "../services/ebookService";

export function FileUploadComponent({ onUploadComplete }) {
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
    <div className="mx-auto mt-6 py-4 w-100">
      <label htmlFor="fileUpload" className="btn-primary py-2">
        Upload File
      </label>
      <input type="file" id="fileUpload" style={{ display: "none" }} onChange={handleChange} />
    </div>
  );
}
