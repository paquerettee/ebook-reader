// IndexedDB utility for storing audio and ebook files

import { DB_NAME, STORE_NAME } from "../config";

export const DBHandler = {
  async openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = ({ target }) => {
        const db = target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" });
        }
      };
      request.onsuccess = ({ target }) => resolve(target.result);
      request.onerror = ({ target }) => reject(target.error);
    });
  },

  async saveFile(id, blob) {
    try {
      const db = await this.openDB();
      const tx = db.transaction([STORE_NAME], "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put({ id, blob, timestamp: Date.now() });

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = (e) => reject(new Error(`Transaction failed: ${e.target.error}`));
      });
    } catch (err) {
      throw new Error(`Failed to save file: ${err.message}`);
    }
  },

  async loadFile(id, asText = false) {
    try {
      const db = await this.openDB();
      const tx = db.transaction([STORE_NAME], "readonly");
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(id);

      return await new Promise((resolve, reject) => {
        request.onsuccess = () => {
          const blob = request.result?.blob;
          if (!blob) {
            const err = new Error("File not found");
            err.name = "FILE_NOT_FOUND";
            return reject(err);
            //throw err;
          }

          if (asText) {
            blob
              .text()
              .then(resolve)
              .catch((err) => reject(new Error(`Failed to read text: ${err.message}`)));
          } else {
            try {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } catch (err) {
              reject(new Error(`Failed to create URL: ${err.message}`));
            }
          }
        };

        request.onerror = (e) => {
          reject(new Error(`Read failed: ${e.target.error}`));
        };
      });
    } catch (err) {
      console.log("ERROR", err);
      // throw new Error(`Failed to load file: ${err.message}`);
      throw err;
    }
  },

  async deleteFile(id) {
    try {
      const db = await this.openDB();
      const tx = db.transaction([STORE_NAME], "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(id);

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = (e) => reject(new Error(`Delete failed: ${e.target.error}`));
      });
    } catch (err) {
      throw new Error(`Failed to delete file: ${err.message}`);
    }
  },
};
