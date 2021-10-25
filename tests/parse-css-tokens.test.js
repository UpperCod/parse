import test from "ava";
import { createParseCssTokens } from "../src/parse-css-tokens.js";

test("createParseCssTokens", async (t) => {
    const { tokenize, tokens } = createParseCssTokens({ prefix: "prefix--" });

    const cssProps = tokenize`
    @title: Tokens;
    @description: Bla bla bla...;
    primary: orange;
    @prop: The black!;
    secondary: black;`;

    t.is(
        [
            `--primary: var(--prefix--primary, orange);`,
            `--secondary: var(--prefix--secondary, black);`,
        ].join("\n"),
        cssProps
    );

    t.deepEqual(
        {
            Tokens: {
                children: [
                    ["--prefix--primary", "orange", ""],
                    ["--prefix--secondary", "black", "The black!"],
                ],
                title: "Tokens",
                description: "Bla bla bla...",
            },
        },
        tokens
    );
});
