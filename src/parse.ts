export function extractFileId(link: string): string {
  if (typeof link !== "string" || link.trim() === "") {
    throw new Error("Please provide a Google Drive link");
  }

  if (/\/folders\//.test(link)) {
    throw new Error("Folder links are not supported. Use a link to a single file");
  }

  const match = link.match(/\/d\/([\w-]+)|[?&]id=([\w-]+)/);
  const id = match?.[1] ?? match?.[2];

  if (!id) {
    throw new Error("Not a valid Google Drive link");
  }

  return id;
}