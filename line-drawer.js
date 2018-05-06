class LineDrawer{
  constructor(context, shape = []){
    this.context = context;

    this.setShape(shape);
  }

  setShape(shape = []){
    this.shape = [];
    this.totalLength = 0;

    for(let i = 0; i < shape.length; i++){
      let line = shape[i];
      let dx = line[2] - line[0];
      let dy = line[3] - line[1];
      let dist = Math.sqrt(dx * dx + dy * dy);
      this.totalLength += dist;
      this.shape.push({
        start: {x: line[0], y: line[1]},
        end: {x: line[2], y: line[3]},
        dx, dy,
        length: dist,
        relative: 0
      });
    }

    this.shape.map(line => {
      line.relative = line.length/this.totalLength;
      return line;
    });
  }

  draw(start = 0, end = 1, x = 0, y = 0, sx = 1, sy = 1){
    let prevDrawn = 0;
    let currDrawn = 0;
    let drawing = false;
    let drawn = false;
    let stopNext = false;

    for(let i = 0; i < this.shape.length; i++){
      let line = this.shape[i];
      let lineStart = 0;
      let lineEnd = 1;
      prevDrawn = currDrawn;
      currDrawn += line.relative;

      if(start <= currDrawn && !drawing && !drawn){
        let diff = currDrawn - start;
        lineStart = 1 - diff/line.relative;
        drawing = true;
        drawn = true;
      }

      if(drawing && prevDrawn <= end && end <= currDrawn){
        stopNext = true;
        let diff = currDrawn - end;
        lineEnd = 1 - diff/line.relative;
      }

      if(drawing){
        this.context.moveTo(
          Math.round(x + (line.start.x + line.dx * lineStart) * sx) + 0.5,
          Math.round(y + (line.start.y + line.dy * lineStart) * sy) + 0.5);
        this.context.lineTo(
          Math.round(x + (line.start.x + line.dx * lineEnd) * sx) + 0.5,
          Math.round(y + (line.start.y + line.dy * lineEnd) * sy) + 0.5);
      }

      if(stopNext) break;
    }
  }
}
