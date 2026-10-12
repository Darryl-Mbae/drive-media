export declare function toImageUrl(link: string, width?: number): string;
export declare function toVideoEmbedUrl(link: string): string;
export declare function convertMany(links: string[], convert: (link: string) => string): {
    results: string[];
    errors: {
        link: string;
        message: string;
    }[];
};
