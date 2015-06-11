function draw() {
    'use strict';

    var W = +document.getElementById("canvas-width").value;
    var H = +document.getElementById("canvas-height").value;
    if (!(W > 0 && H > 0 && W < 5000 && H < 5000 && W % 1 == 0 && H % 1 == 0)) return;

    var canvas = document.getElementById("canvas");
    canvas.width = W;
    canvas.height = H;
    var g = canvas.getContext('2d');
    g.fillStyle = "white";
    g.fillRect(0, 0, W, H);
    var points = [];
    var n = 10;
    for (var i = 0; i < n; i++) {
        points[i] = {
            x: Math.floor(100 * (Math.random() - 0.5)),
            y: Math.floor(100 * (Math.random() - 0.5))
        }
    }

    var hullPoints = convexHull(points);

    var minX = 1e9;
    var maxX = -1e9;
    var minY = 1e9;
    var maxY = -1e9;
    hullPoints.forEach(function (p) {
        minX = Math.min(minX, p.x);
        maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y);
        maxY = Math.max(maxY, p.y);
    });
    var scale = Math.max(Math.max(maxX, -minX), Math.max(maxY, -minY)) * 1.05;

    function line(a, b) {
        g.beginPath();
        g.moveTo(a.x, a.y);
        g.lineTo(b.x, b.y);
        g.stroke();
    }

    for (var k = -50; k <= 50; k++) {
        if (k == 0) {
            g.lineWidth = 2;
            g.strokeStyle = "black";
        } else {
            g.lineWidth = 1;
            g.strokeStyle = "#cccccc";
        }
        line({x: k * 20 + W / 2, y: 0}, {x: k * 20 + W / 2, y: H});
        line({x: 0, y: k * 20 + H / 2}, {x: W, y: k * 20 + H / 2});
    }

    function transform(p) {
        return {x: (1 + p.x / scale) * W / 2, y: (1 + p.y / scale) * H / 2};
    }

    function drawPoint(point) {
        var p = transform(point);
        var radius = 4;
        g.beginPath();
        g.moveTo(p.x - radius, p.y);
        g.lineTo(p.x, p.y + radius);
        g.lineTo(p.x + radius, p.y);
        g.lineTo(p.x, p.y - radius);
        g.closePath();
        g.fill();
    }

    g.fillStyle = 'red';
    points.forEach(drawPoint);

    g.fillStyle = 'blue';
    hullPoints.forEach(drawPoint);

    g.beginPath();
    hullPoints.forEach(function (point) {
        var p = transform(point);
        g.lineTo(p.x, p.y);
    });
    g.closePath();
    g.globalAlpha = 0.2;
    g.fill();
    g.globalAlpha = 1;
    g.strokeStyle = 'blue';
    g.stroke();
}

draw();

var elements = document.getElementsByTagName("input");
for (var i = 0; i < elements.length; i++) {
    elements[i].onchange = draw;
    elements[i].oninput = draw;
}
