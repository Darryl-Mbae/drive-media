"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFileId = extractFileId;
function extractFileId(link) {
    var _a;
    if (typeof link !== "string" || link.trim() === "") {
        throw new Error("Please provide a Google Drive link");
    }
    if (/\/folders\//.test(link)) {
        throw new Error("Folder links are not supported. Use a link to a single file");
    }
    const match = link.match(/\/d\/([\w-]+)|[?&]id=([\w-]+)/);
    const id = (_a = match === null || match === void 0 ? void 0 : match[1]) !== null && _a !== void 0 ? _a : match === null || match === void 0 ? void 0 : match[2];
    if (!id) {
        throw new Error("Not a valid Google Drive link");
    }
    return id;
}
