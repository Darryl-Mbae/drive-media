import { extractFileId } from "./parse";

export function toImageUrl(link: string, width = 1000): string {
  const id = extractFileId(link);
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

export function toVideoEmbedUrl(link: string): string {
  const id = extractFileId(link);
  return `https://drive.google.com/file/d/${id}/preview`;
}