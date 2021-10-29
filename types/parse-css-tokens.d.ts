export function createParseCssTokens({ prefix, tokens }: {
    prefix: string;
    tokens: {
        [x: string]: Tokens;
    };
}): {
    /**
     * @type {Object<string,Tokens>}
     */
    tokens: {
        [x: string]: Tokens;
    };
    /**
     * @param {TemplateStringsArray}
     */
    tokenize({ raw }: TemplateStringsArray): string;
};
export type Tokens = {
    title: string;
    type?: string | undefined;
    children: [string, string, string, (string | undefined)][];
};
