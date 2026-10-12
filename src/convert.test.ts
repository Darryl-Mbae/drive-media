import { toImageUrl } from "./convert";

describe("toImageUrl", () => {
  test("builds a thumbnail URL from a /file/d/ link", () => {
    expect(
      toImageUrl("https://drive.google.com/file/d/abc123/view")
    ).toBe("https://drive.google.com/thumbnail?id=abc123&sz=w1000");
  });

  test("uses a custom width", () => {
    expect(
      toImageUrl("https://drive.google.com/open?id=abc123", 500)
    ).toBe("https://drive.google.com/thumbnail?id=abc123&sz=w500");
  });

  test("throws on folder links", () => {
    expect(() =>
      toImageUrl("https://drive.google.com/drive/folders/abc123")
    ).toThrow("Folder links are not supported");
  });

  test("throws on an empty string", () => {
    expect(() => toImageUrl("")).toThrow("Please provide a Google Drive link");
  });
});