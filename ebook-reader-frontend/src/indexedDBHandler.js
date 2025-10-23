// Open or create IndexedDB
export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("AudioDB", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("audioStore", { keyPath: "id" });
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

// Save blob to IndexedDB
export async function saveAudioBlob(blob, fileid) {
  console.log("Saving audio to indexedDB...");
  const db = await openDB();
  const transaction = db.transaction(["audioStore"], "readwrite");
  const store = transaction.objectStore("audioStore");

  const entry = {
    id: fileid,
    blob: blob,
    timestamp: Date.now(),
  };

  store.put(entry);
  transaction.oncomplete = () => console.log("Audio saved to IndexedDB");
  transaction.onerror = (e) => console.error("Save failed:", e.target.error);
}

// Load blob from IndexedDB
export async function loadAudioBlob(fileid) {
  const db = await openDB();
  const transaction = db.transaction(["audioStore"], "readonly");
  const store = transaction.objectStore("audioStore");

  return new Promise((resolve, reject) => {
    const request = store.get(fileid);
    request.onsuccess = function () {
      if (request.result) {
        const url = URL.createObjectURL(request.result.blob);
        resolve(url);
      } else {
        reject("No audio found");
      }
    };
    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}
