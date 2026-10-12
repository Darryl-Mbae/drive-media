import { toImageUrl, toVideoEmbedUrl, convertMany } from "./convert";

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

describe("toVideoEmbedUrl", () => {
  test("builds a preview URL from a /file/d/ link", () => {
    expect(
      toVideoEmbedUrl("https://drive.google.com/file/d/abc123/view")
    ).toBe("https://drive.google.com/file/d/abc123/preview");
  });

  test("works with open?id= links", () => {
    expect(
      toVideoEmbedUrl("https://drive.google.com/open?id=abc123")
    ).toBe("https://drive.google.com/file/d/abc123/preview");
  });

  test("throws on folder links", () => {
    expect(() =>
      toVideoEmbedUrl("https://drive.google.com/drive/folders/abc123")
    ).toThrow("Folder links are not supported");
  });

  test("throws on an empty string", () => {
    expect(() => toVideoEmbedUrl("")).toThrow("Please provide a Google Drive link");
  });
});

describe("convertMany", () => {
  test("converts every valid link", () => {
    const { results, errors } = convertMany(
      [
        "https://drive.google.com/file/d/abc123/view",
        "https://drive.google.com/open?id=def456",
      ],
      toImageUrl
    );

    expect(results).toEqual([
      "https://drive.google.com/thumbnail?id=abc123&sz=w1000",
      "https://drive.google.com/thumbnail?id=def456&sz=w1000",
    ]);
    expect(errors).toEqual([]);
  });

  test("collects errors and keeps going after a bad link", () => {
    const { results, errors } = convertMany(
      [
        "https://drive.google.com/file/d/abc123/view",
        "https://drive.google.com/drive/folders/xyz789",
        "",
      ],
      toImageUrl
    );

    expect(results).toHaveLength(1);
    expect(errors).toHaveLength(2);
    expect(errors[0].message).toContain("Folder links are not supported");
    expect(errors[1].message).toContain("Please provide a Google Drive link");
  });

  test("works with toVideoEmbedUrl", () => {
    const { results } = convertMany(
      ["https://drive.google.com/file/d/abc123/view"],
      toVideoEmbedUrl
    );

    expect(results).toEqual(["https://drive.google.com/file/d/abc123/preview"]);
  });

  test("returns empty results for an empty list", () => {
    expect(convertMany([], toImageUrl)).toEqual({ results: [], errors: [] });
  });
});