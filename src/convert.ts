import { extractFileId } from "./parse";

export function toImageUrl(link: string, width = 1000): string {
  const id = extractFileId(link);
  return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}

export function toVideoEmbedUrl(link: string): string {
  const id = extractFileId(link);
  return `https://drive.google.com/file/d/${id}/preview`;
}

export function convertMany(
  links: string[],
  convert: (link: string) => string
): { results: string[]; errors: { link: string; message: string }[] } {
  const results: string[] = [];
  const errors: { link: string; message: string }[] = [];

  for (const link of links) {
    try {
      results.push(convert(link));
    } catch (e) {
      errors.push({ link, message: (e as Error).message });
    }
  }

  return { results, errors };
}