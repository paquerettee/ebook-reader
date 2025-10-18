import { useState } from "react";
import { BACKEND_URL } from "./config";
import { Ebook } from "./Ebook";
import { useEffect } from "react";

export function EbookList() {
  const [ebooks, setEbooks] = useState([]);

  const list_ebooks = () => {
    fetch(`${BACKEND_URL}ebooks`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Ebooks list fetched successfully:", data);
        setEbooks(data.files);
      })
      .catch((err) => console.error("Fetching ebooks list failed:", err));
  };

  useEffect(() => {
    console.log("frontend, list_ebooks");
    list_ebooks();
  }, []);

  return (
    <ul className="ebook-list">
      {ebooks.map((ebook, index) => (
        // fixme!!! index not a good key for dynamic arrays
        <li key={index}>
          <Ebook data={ebook} />
        </li>
      ))}
    </ul>
  );
}
