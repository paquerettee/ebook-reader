const BACKEND_URL = "http://localhost:5000/";

export function HandleFileUpload() {
  // get the file from user

  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected");
      return;
    }
    sendFile(file);
  };

  const sendFile = (file) => {
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
