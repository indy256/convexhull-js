Convexhull.js is a high-performance JavaScript 2D convex hull library.

Sample Usage:


```js
var convexHull = require("convexhull-js");
var points = [
    {x: -1.2, y: -2.2},
    {x:  1.1, y: -0.5},
    {x:  0.1, y: 0.1},
    {x:  1.3, y: 3.1},
    {x:  0.0, y: 2.3}
];

convexHull(points);
// [ { x: -1.2, y: -2.2 },
//   { x: 0, y: 2.3 },
//   { x: 1.3, y: 3.1 },
//   { x: 1.1, y: -0.5 } ]
```

Checkout the demo: http://indy256.github.io/convexhull-js/

![convexhull](https://raw.githubusercontent.com/indy256/convexhull-js/gh-pages/sample.png)
