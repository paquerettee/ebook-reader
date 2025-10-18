import { FileAudioHandler } from "./FileHandler";

export function Ebook({ data }) {
  console.log("Ebook: ", data);
  return (
    <div>
      <p className="text-black">{data}</p>
      <FileAudioHandler filename={data}></FileAudioHandler>
    </div>
  );
}
