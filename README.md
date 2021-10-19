# @uppercod/parse

utilities for text analysis

## parse-css-params

Capture the parameters using the css parameter syntax, example:

```js
import { parseCssParams } from "@uppercod/parse/parse-css-params";

parseCssParams(`var(--z, var(--x)) url("background.jpg")`);
```

**Output**

```json
[
    [
        ["var", ["--z", "var(--x)"]],
        ["url", ["background.jpg"]]
    ]
]
```
