function rnd(n, m){
    return Math.floor(Math.random()*(m-n) + n);
};
function d2a(n){
    return n*Math.PI/180;
};
function snow(id) {
    //在画布中生成雪花：
    var oC = document.getElementById(id);
    var gd = oC.getContext("2d");
    oC.width = document.documentElement.clientWidth;
    oC.height = document.documentElement.clientHeight;
    var maxW = oC.width;
    var maxH = oC.height;
    oC.style.background = '#000';
    var arr = [];
    var width = 20;
    for (var i = 0; i < 100; i++) {
        arr.push({
            "left": rnd(0, oC.width),
            "top": rnd(0, oC.height),
            "deg": rnd(-10, 10),
            "scale": rnd(2, 10)
        });
    }
    setInterval(function () {
        gd.clearRect(0, 0, oC.width, oC.height);
        gd.save();
        for (var i = 0; i < arr.length; i++) {
            var h = 0.5 * arr[i].scale;
            arr[i].left = arr[i].left + Math.tan(d2a(arr[i].deg)) * h;
            arr[i].top = arr[i].top + h;
            //若已在画面外则删除
            if (arr[i].left < 0 || arr[i].left > maxW || arr[i].top > maxH) {
                arr.splice(i--, 1);
                continue;
            }
            var width_i = arr[i].scale;
            var ra = gd.createRadialGradient(arr[i].left, arr[i].top, width_i / 4, arr[i].left, arr[i].top, width_i);
            ra.addColorStop(0, "rgba(255,255,255,1)");
            ra.addColorStop(1, "rgba(255,255,255,0.1)");
            gd.fillStyle = ra;
            gd.beginPath();
            gd.arc(arr[i].left, arr[i].top, width_i, 0, 2 * Math.PI);
            gd.fill();
        }
        gd.restore();
    }, 16);
    //不断增加新的雪花
    function next() {
        setTimeout(function () {
            if (arr.length < 200) {
                for (var i = 0; i < 20; i++) {
                    arr.push({
                        "left": rnd(0, oC.width),
                        "top": 0,
                        "deg": rnd(-10, 10),
                        "scale": rnd(2, 10)
                    });
                }
            }
            next();
        }, rnd(200, 700));
    };
    next();
}
