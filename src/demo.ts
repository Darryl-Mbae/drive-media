/**
 * Browser demo for drive-media library
 * This file is used for development and demos only, not published in the npm package
 */

import { toImageUrl, toVideoEmbedUrl } from "./convert";

const input = document.getElementById("link") as HTMLInputElement;
const type = document.getElementById("type") as HTMLSelectElement;
const button = document.getElementById("go") as HTMLButtonElement;
const error = document.getElementById("error") as HTMLParagraphElement;
const out = document.getElementById("out") as HTMLDivElement;

button.addEventListener("click", () => {
  error.textContent = "";
  error.classList.remove("show");
  out.innerHTML = "";

  try {
    if (type.value === "image") {
      const img = document.createElement("img");
      img.src = toImageUrl(input.value);
      img.alt = "Converted image from Google Drive";
      out.appendChild(img);
    } else {
      const frame = document.createElement("iframe");
      frame.src = toVideoEmbedUrl(input.value);
      frame.title = "Converted video from Google Drive";
      out.appendChild(frame);
    }
  } catch (e) {
    error.textContent = (e as Error).message;
    error.classList.add("show");
  }
});

// Allow Enter key to trigger conversion
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});
