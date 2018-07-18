
(function () {
    var canvas = document.getElementById('tutorial');
    var ctx = canvas.getContext('2d');

    canvas.width = 400;
    canvas.height = 400;

    ctx.fillStyle = "rgb(200,0,0)";
    // 正方形
    // ctx.beginPath();
    // ctx.moveTo(100,100);
    // ctx.lineTo(300,100);
    // ctx.lineTo(300,300);
    // ctx.lineTo(100,300);
    // ctx.closePath();
    // ctx.stroke();
    // 圓形
    // ctx.beginPath();
    // ctx.arc(200,200,100,0,2*Math.PI)
    // ctx.closePath();
    // ctx.stroke();
    // 使用方法去包裝影格，以方便去更新
    function draw() {
        ctx.beginPath();
        for (var i = 0; i < 10; i++) {
            let pos = i * 50;
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, 400);
            ctx.fillText(pos, pos, 10); // 繪製文字 fillText(text, x, y [, maxWidth])

            ctx.moveTo(0, pos);
            ctx.lineTo(400, pos);
            ctx.fillText(pos, 10, pos);
        }
        ctx.strokeStyle = "rgba(0,0,0,0.1)"
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(25, 350);
        ctx.lineTo(375, 350);
        ctx.lineWidth = 2; // 設定線的粗度
        ctx.strokeStyle = "rgba(0,0,0,1)"
        ctx.stroke();

        ctx.fillStyle = "#ed5a2a";
        ctx.fillRect(300, 300, 50, 50); // 直接設定定位填滿 fillRect(x,y,width,height)
        ctx.strokeRect(300, 300, 50, 50); // 直接設定定位描邊 fillRect(x,y,width,height)

        ctx.beginPath(); // 多塊同色塊同線條可使用此方法
        ctx.rect(250, 250, 50, 100);
        ctx.rect(50, 300, 50, 50);
        ctx.fillStyle = "#ffc12c";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.rect(100, 250, 50, 100);
        ctx.rect(200, 250, 50, 100);
        ctx.fillStyle = "#ff912c";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(100, 200);
        ctx.lineTo(250, 200);
        ctx.lineTo(250, 250);
        ctx.lineTo(200, 250);
        ctx.arc(175, 250, 25, Math.PI * 2, Math.PI, true); // arc(x,y,r,起始圓位置,終點圓位置,boolean) [boolean預設為false，表示逆時鐘]
        ctx.lineTo(100, 250);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.stroke();

        // 屋頂
        ctx.beginPath();
        ctx.moveTo(100, 200);
        ctx.lineTo(175, 150);
        ctx.lineTo(250, 200);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();

        // 旗幟
        ctx.beginPath();
            ctx.moveTo(175, 150);
            ctx.lineTo(175, 100);
            ctx.lineTo(200, 110);
            ctx.lineTo(175, 120);
        ctx.closePath();
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();

        // 車車
        ctx.fillStyle="white";
        // 先畫線再填色，會造成框線變細，因為線會被填色壓到，所以視覺看起來就會比較細。
        // 所以請填色再畫框線
        ctx.fillRect(300,325,40,25);
        ctx.strokeRect(300,325,40,25);
        ctx.beginPath();
        ctx.arc(300+10,350,5,0,Math.PI*2);
        ctx.arc(300+30,350,5,0,Math.PI*2);
        
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.stroke();

    }

    draw();
})()