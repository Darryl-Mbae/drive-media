import { extractFileId } from "./parse";

describe("extractFileId", () => {
  test("reads /file/d/ID/view links", () => {
    expect(
      extractFileId("https://drive.google.com/file/d/abc123/view")
    ).toBe("abc123");
  });

  test("ignores extra params like usp=sharing", () => {
    expect(
      extractFileId("https://drive.google.com/file/d/abc123/view?usp=sharing")
    ).toBe("abc123");
  });

  test("reads open?id= links", () => {
    expect(
      extractFileId("https://drive.google.com/open?id=abc123")
    ).toBe("abc123");
  });

  test("reads uc?id= links", () => {
    expect(
      extractFileId("https://drive.google.com/uc?export=view&id=abc123")
    ).toBe("abc123");
  });

  test("handles IDs with dashes and underscores", () => {
    expect(
      extractFileId("https://drive.google.com/file/d/1a-B_c2/view")
    ).toBe("1a-B_c2");
  });

  test("throws on a link with no file ID", () => {
    expect(() => extractFileId("https://google.com")).toThrow(
      "Not a valid Google Drive link"
    );
  });

  test("throws on an empty string", () => {
    expect(() => extractFileId("")).toThrow("Please provide a Google Drive link");
  });

  test("throws on folder links", () => {
    expect(() =>
      extractFileId("https://drive.google.com/drive/folders/abc123")
    ).toThrow("Folder links are not supported");
  });
});