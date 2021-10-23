/**
 * captures the parameters of a string
 * @example
 * ```js
 * parseParams(`var(--z)`) // [ [["var","--z"]] ]
 * ```
 * @param {string} input
 * @returns {[string,string[]][]}
 */
export function parseCssParams(input) {
    input = input.replace(/\s+/g, " ") + " ";

    let group = [];
    const groups = [group];
    let count = 0;
    let position = 0;
    let parentWord = "";
    let word = "";
    let params;
    let lastQuote;

    const addParams = (param) =>
        params && params.push(param.trim() || undefined);

    const addUtil = (word, params) => group.push([word, params]);

    while (position < input.length) {
        const letter = input[position++];
        if (count && (letter == '"' || letter == "'")) {
            if (lastQuote === letter) {
                lastQuote = "";
                continue;
            } else {
                if (!lastQuote) {
                    lastQuote = letter;
                    continue;
                }
            }
        }
        if (lastQuote) {
            word += letter;
        } else if (letter == "," && !count) {
            groups.push((group = []));
        } else if (letter == "," && count == 1) {
            addParams(word);
            word = "";
        } else if (letter == " " && !count && (parentWord || word)) {
            addUtil(parentWord || word, []);
            word = "";
            continue;
        } else if (letter == "(" && !count++) {
            parentWord = word;
            params = [];
            word = "";
            continue;
        } else if (letter == ")" && !--count) {
            addParams(word);
            addUtil(parentWord, params);
            parentWord = word = "";
            continue;
        } else {
            word += letter == " " && !count ? "" : letter;
        }
    }

    return groups;
}
