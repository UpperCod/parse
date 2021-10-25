/**
 * @typedef {Object} Tokens
 * @property {string} title
 * @property {string} [type]
 * @property {[string,string][]} children
 */

/**
 *
 * @param {{prefix:string,tokens:Object<string,Tokens>}} config
 */
export const createParseCssTokens = ({ prefix, tokens = {} }) => ({
    /**
     * @type {Object<string,Tokens>}
     */
    tokens,
    /**
     * @param {TemplateStringsArray}
     */
    tokenize({ raw }) {
        let id;
        let cssProps = "";
        let text = raw.join("");

        text.replace(
            /\s*(@){0,1}([^:]+)\s*:\s*([^;]+);/g,
            (part, meta, prop, value) => {
                if (meta && prop == "title") id = value;

                if (id) {
                    tokens[id] = tokens[id] || {
                        children: [],
                    };
                    if (meta) {
                        tokens[id][prop] = value;
                    } else {
                        const global = `--${prefix}${prop}`;
                        cssProps += `--${prop}: var(${global}, ${value});\n`;
                        tokens[id].children.push([global, value]);
                    }
                }
            }
        );

        return cssProps.trim();
    },
});
