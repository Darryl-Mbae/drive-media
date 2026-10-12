"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toImageUrl = toImageUrl;
exports.toVideoEmbedUrl = toVideoEmbedUrl;
exports.convertMany = convertMany;
const parse_1 = require("./parse");
function toImageUrl(link, width = 1000) {
    const id = (0, parse_1.extractFileId)(link);
    return `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
}
function toVideoEmbedUrl(link) {
    const id = (0, parse_1.extractFileId)(link);
    return `https://drive.google.com/file/d/${id}/preview`;
}
function convertMany(links, convert) {
    const results = [];
    const errors = [];
    for (const link of links) {
        try {
            results.push(convert(link));
        }
        catch (e) {
            errors.push({ link, message: e.message });
        }
    }
    return { results, errors };
}
