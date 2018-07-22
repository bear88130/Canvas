


// 環境變數
var updateFPS = 30;
var showMouse = true;
var time = 0;
var bgColor = "#001D2E";
var virtualLine = 5;
var shield = 120;
var ship1, ship2, ship3

// 物件
var ship = {
    x: 0,
    y: 0,
    deg: 0,
    r: 100,
    draw() {
        //船繪製
        ctx.save();
        //先移動座標
        ctx.translate(ww / 2, wh / 2);
        ctx.rotate(this.deg);
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2)
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 20;
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'white';
        ctx.stroke();

        for (var i = 0; i < 360; i += 120) {
            ctx.lineWidth = 5
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -this.r)
            ctx.stroke();
            ctx.rotate(Math.PI * 2 / 3);
        }

        for (var i = 0; i < 360; i += Math.PI * 2 / virtualLine) {
            ctx.beginPath();
            ctx.arc(0, 0, this.r + 30, 0, Math.PI / virtualLine)
            ctx.strokeStyle = 'white'
            ctx.lineWidth = 2;
            ctx.shadowBlur = 1;
            ctx.shadowColor = 'white';
            ctx.stroke();
            ctx.rotate(Math.PI / virtualLine);
            ctx.rotate(Math.PI / virtualLine);
        }

        ctx.beginPath();
        ctx.arc(0, 0, this.r + 70, 0, Math.PI * 2 / 3)
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 5;
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'white';
        ctx.stroke();

        ctx.restore();
    }
}

//控制
var controls = {
    value: 0
}
var gui = new dat.GUI();
gui.add(controls, 'value', -2, 2).step(0.01).onChange(function (value) { })

//--------------------
class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    move(x, y) {
        this.x += x;
        this.y += y;
    }
    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y)
    }
    sub(v) {
        return new Vec2(this.x - v.x, this.y - v.y)
    }
    mul(s) {
        return new Vec2(this.x * s, this.y * s)
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    set length(nv) {
        let temp = this.unit.mul(nv)
        this.set(temp.x, temp.y)
    }
    clone() {
        return new Vec2(this.x, this.y)
    }
    toString() {
        return `(${this.x},${this.y})`
    }
    equal(v) {
        return this.x == v.x && this.y == v.y
    }
    // 算出向量角度
    get angle() {
        return Math.atans2(this.y, this.x)
    }
    // 取得單位向量
    get unit() {
        return this.mul(1 / this.length)
    }

}
var a = new Vec2(3, 4);

//--------------------

var canvas = document.getElementById('mycanvas');
var ctx = canvas.getContext('2d');

// 自定形狀
ctx.circle = function (v, r) {
    this.arc(v.x, v.y, r, 0, Math.PI * 2);
}
ctx.line = function (v1, v2) {
    this.moveTo(v1.x, v1.y)
    this.lineTo(v2.x, v2.y)
}

// 配置
function initCanvas() {
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;
}
initCanvas();

// 邏輯始使化
function init() {
    ship1 = Object.assign({}, ship);
    ship2 = Object.assign({}, ship);
    ship3 = Object.assign({}, ship);
}
// 更新遊戲邏輯
function update() {
    time++
    ship1.deg += controls.value;
    ship2.deg += controls.value - 0.02;
    ship3.deg += controls.value + 0.02;
}
// 更新畫面
function draw() {
    // 清空背景
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, ww, wh);

    // 繪製內容 Start

    //格線繪製
    let spanWidth = 50
    ctx.beginPath();
    for (var i = 0; i < ww; i += spanWidth) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, wh);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.stroke();

    ctx.beginPath();
    for (var i = 0; i < wh; i += spanWidth) {
        ctx.moveTo(0, i);
        ctx.lineTo(ww, i);
    }
    ctx.strokeStyle = "rgba(255,255,255.0.2)";
    ctx.stroke();

    ctx.save();
    ship1.draw();
    ctx.restore();

    ctx.save();
    ship2.draw();
    ship2.r = 150;
    ctx.restore();

    ctx.save();
    ship3.draw();
    ctx.restore();

    // 繪製內容 End

    //滑鼠
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.circle(mousePos, 5);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.translate(mousePos.x, mousePos.y)
    ctx.strokeStyle = "red";
    let len = 20;
    ctx.line(new Vec2(-len, 0), new Vec2(len, 0));
    ctx.fillText(mousePos, 10, -10)
    ctx.rotate(Math.PI / 2)
    ctx.line(new Vec2(-len, 0), new Vec2(len, 0));
    ctx.stroke();
    ctx.restore()

    requestAnimationFrame(draw);
}
// 頁面載入
function loaded() {
    initCanvas();
    init();
    // 盡可能快速呼叫 draw
    requestAnimationFrame(draw);
    // 每秒 updateFPS 次執行 update
    setInterval(update, 1000 / updateFPS);
}
// 載入 縮放事件
window.addEventListener('load', loaded);
window.addEventListener('resize', initCanvas);

//--------------

var mousePos = new Vec2(0, 0);
var mousePosDown = new Vec2(0, 0);
var mousePosUp = new Vec2(0, 0);

window.addEventListener("mousemove", mousemove);
window.addEventListener("mouseup", mouseup);
window.addEventListener("mousemdown", mousedown);

function mousemove(evt) {
    mousePos.set(evt.x, evt.y);
    console.log(mousePos);
}
function mouseup(evt) {
    mousePos.set(evt.x, evt.y);
    mousePosUp = mousePos.clone();
}
function mousedown(evt) {
    mousePos.set(evt.x, evt.y);
    mousePosDown = mousePos.clone();
}
//--------------
