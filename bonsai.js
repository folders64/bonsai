// inspired by https://p.teknik.io/Raw/EWWzQ
// and https://www.reddit.com/r/unixporn/comments/amdt7m/2bwm_cat/

var output = document.getElementById("output");
var rows = 45;
var cols = 90;
var grid;
var branches = 0;
var maxBranches = 1024;
var t = 50;

function init() {
    grid = [];
    for (var row = 0; row < rows; row++) {
        grid.push(Array(cols).fill(" "));
    }
}

function show() {
    var str = getString().split('\n');
    output.innerHTML = str.join('<br>');
}

function getString() {
    var str = "";
    for (var row = 0; row < rows; row++) {
        str += grid[row].join("") + "\n";
    }
    return str;
}

function bonsai() {
    init();
    grow();
    show();
}

bonsai();

function grow() {
    var start = Math.floor(cols / 2);

    var x = start;
    var y = rows - 4;
    var life = 32;

    setTimeout(function () { step(x, y, life); }, 400);
}

function nextTimeT() {
    t += 2;
    return t;
}

function nextTime() {
    return 1 + Math.floor(nextTimeT() / 5);
}

function step(x, y, life) {
    if (life < 1) {
        return;
    }

    var dy = (rand(0, 10) > 2) ? -1 : 0;
    var dx = rand(-4, 4);

    if (branches < maxBranches) {
        if (life % 10 === 0 || rand(0, 30) < 3 || life < 5) {
            branches++;
            setTimeout(function () { step(x, y, life - 1); }, t + rand(1, 6));
        }
    }

    x += dx;
    y += dy;

    var char = (dx > 0) ? "/" : "\\";
    if (dx === 0) { char = "|"; }
    if (dy === 0) { char = "~"; }
    if (life === 1) {
        var font = (Math.random() < 0.5) ? "Lucida Console" : "monospace";
        var fontWeight = (Math.random() < 0.5) ? "bold" : "normal";
        char = "<span style='color:#b5ffbf; font-family:" + font + "; font-weight:" + fontWeight + ";'>&</span>";
    }
    if (x < 0 || x > rows - 1 || y < 0) { return; }
    grid[y][x] = char;
    show();
    if (life > 0) {
        setTimeout(function () { step(x, y, life - 1); }, t + rand(1, 11));
    }
}

function rand(min, max) {
    return Math.floor(min + Math.random() * (Math.abs(min) + max));
}
