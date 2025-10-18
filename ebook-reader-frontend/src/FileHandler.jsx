import { BACKEND_URL } from "./config";

export function FileUploadHandler() {
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

export function FileAudioHandler({ filename }) {
  const generateAudio = () => {
    fetch(`${BACKEND_URL}generate-audio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log("Audio generated successful:", data))
      .catch((err) => console.error("Audio generation error:", err));
  };

  // const downloadAudio = () => {};

  return (
    <div>
      <button className="text-black bg-blue-500" onClick={generateAudio}>
        Generate Audio
      </button>
    </div>
  );
}
