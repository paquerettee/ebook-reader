import { BACKEND_URL } from "../config";

export const HttpClient = {
  async handleGetRequest(endpoint) {
    // console.log("HttpClient.handleGetRequest");
    try {
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      return response;
    } catch (err) {
      console.error("Get request failed:", err);
      return null;
    }
  },

  async handlePostRequest(endpoint, filename) {
    // console.log("HttpClient.handlePostRequest");
    try {
      const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: filename }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      return response;
    } catch (err) {
      console.error("Audio generation error:", err);
      return null;
    }
  },

  async handlePostDataRequest(endpoint, file) {
    // console.log("HttpClient.handlePostRequest: ", file);
    let formData = new FormData();
    formData.append("file", file);
    try {
      let response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Post request failed with status ${response.status}`);
      }
      return response;
    } catch (err) {
      console.error("Upload error:", err);
    }
  },

  async handleDeleteRequest(endpoint = "delete", filename) {
    // console.log("HttpClient.handleDeleteRequest: ", filename);
    try {
      let response = await fetch(`${BACKEND_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: filename }),
      });
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      return response;
    } catch (err) {
      console.error("Delete request error:", err);
      return null;
    }
  },
};
