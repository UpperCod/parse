import test from "ava";
import { parseCssParams } from "../src/parse-css-params.js";

test("parseCssParams", async (t) => {
    t.deepEqual(
        parseCssParams(
            "var(a,var(b)) url('../my-image-a.jpg','../my-image-a.jpg')"
        ),
        [
            [
                ["var", ["a", "var(b)"]],
                ["url", ["../my-image-a.jpg", "../my-image-a.jpg"]],
            ],
        ]
    );
});
