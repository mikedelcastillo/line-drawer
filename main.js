window.addEventListener("load", () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d", {
    antialias: false,
    alpha: false
  });
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  shape = [[0,0,5,3],[5,3,7,0],[7,0,0,0],[5,3,10,3],[10,3,7,0],[7,0,13,0],[13,0,10,3],[10,3,12,3],[12,3,13,0],[13,0,20,0],[20,0,12,3],[12,3,23,3],[23,3,20,0],[20,0,26,0],[26,0,23,3],[26,0,26,7],[26,7,23,3],[23,3,23,13],[23,13,26,7],[26,7,26,10],[26,10,23,13],[23,13,26,16],[26,16,26,10],[23,13,23,20],[23,20,26,16],[26,16,26,25],[26,25,23,20],[23,20,23,24],[23,24,26,25],[26,25,26,28],[23,24,26,28],[26,28,21,28],[21,28,23,24],[23,24,11,24],[11,24,21,28],[21,28,16,28],[16,28,11,24],[11,24,12,28],[12,28,16,28],[12,28,7,28],[7,28,11,24],[11,24,5,24],[5,24,7,28],[7,28,0,28],[0,28,5,24],[5,24,5,17],[5,17,0,28],[0,28,0,12],[0,12,5,17],[5,17,5,14],[5,14,0,12],[5,14,5,8],[5,8,0,12],[0,12,0,0],[0,0,5,8],[5,8,5,3]];

  ld = new LineDrawer(context, shape);

  t = 0;

  let f = t => {
    t = Math.max(0, Math.min(1, t));
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  loop = () => {
    context.imageSmoothingEnabled = false;
    context.strokeStyle = "white";
    context.lineWidth = 1;
    context.lineCap = "round";
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();

    let lag = 0.25;

    t = (t + 0.01) % (1 + lag * 2);

    start = f(t - lag);
    end = f(t);

    ld.draw(start, end, 100, 100, 10, 10);

    context.stroke();



    requestAnimationFrame(loop);

  }

  loop();

}, false);
