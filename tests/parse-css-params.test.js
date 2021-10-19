import test from "ava";
import { parseParams } from "../src/parse-params.js";

test("parseParams", async (t) => {
    t.deepEqual(
        parseParams(
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
