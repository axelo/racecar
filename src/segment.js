function Segment() {
  'use strict';

  var WIDTH = 25;
  var HEIGHT = 12;
  var ARROW = 6;
  var PADDING = 4;

  var segmentH1 = createSegmentHPath(0, PADDING);
  var segmentH2 = createSegmentHPath(WIDTH+ARROW+ARROW+PADDING*2, PADDING);
  var segmentH3 = createSegmentHPath((WIDTH+ARROW+ARROW+PADDING*2)*2, PADDING);
  var segmentV1 = createSegmentVPath(0, ARROW+PADDING);
  var segmentV2 = createSegmentVPath(WIDTH+ARROW*2+PADDING*2, ARROW + PADDING);
  var segmentV3 = createSegmentVPath(0, ARROW+WIDTH+ARROW+ARROW+PADDING*3);
  var segmentV4 = createSegmentVPath(WIDTH+ARROW*2+PADDING*2, ARROW+WIDTH+ARROW+ARROW+PADDING*3);

  function yo() {
    alert('yo');
    throw 'Dayum!';
  }

// 96x26

  function draw(ctx) {
    ctx.save();
    drawSegmentH(ctx);

    ctx.restore();
  }

  function drawSegmentH(ctx) {
    ctx.globalAlpha = 1.0;

    ctx.save();
    ctx.scale(1/3, 1/3);

    ctx.fillStyle = '#000';

    ctx.fill(segmentH1);
    ctx.fill(segmentH2);
    ctx.fill(segmentH3);

    ctx.fill(segmentV1);
    ctx.fill(segmentV2);
    ctx.fill(segmentV3);
    ctx.fill(segmentV4);


    // ctx.fill(segmentV);
    // ctx.fill(segmentH);
    // ctx.translate(0, 50 + 12 + 2);
    // ctx.fill(segmentV);
    // ctx.fill(segmentH);
    // ctx.translate(0, 50 + 12 + 2);
    // ctx.fill(segmentH);

    // ctx.translate(50 + 12 + 2, -50 - 12 - 2);
    // ctx.fill(segmentV);
    // ctx.translate(0, -50 - 12 - 2);
    // ctx.fill(segmentV);


    ctx.restore();
  }

  function createSegmentVPath(sx, sy) {
    var halfh = HEIGHT / 2;
    var segment = new Path2D();
    segment.moveTo(sx+halfh, sy);
    segment.lineTo(sx+HEIGHT, sy+ARROW);
    segment.lineTo(sx+HEIGHT, sy+ARROW + WIDTH);
    segment.lineTo(sx+halfh, sy+ARROW + WIDTH + ARROW);
    segment.lineTo(sx, sy+ARROW + WIDTH);
    segment.lineTo(sx, sy+ARROW);
    segment.lineTo(sx+halfh, sy);

    return segment;
  }

  function createSegmentHPath(sy, padding) {
    var halfh = HEIGHT / 2;
    var sx = ARROW + padding;

    var segment = new Path2D();
    segment.moveTo(sx, sy + halfh);
    segment.lineTo(sx + ARROW, sy);
    segment.lineTo(sx+WIDTH+ARROW, sy);
    segment.lineTo(sx+WIDTH+ARROW+ARROW, sy+halfh);
    segment.lineTo(sx+WIDTH+ARROW, sy+HEIGHT);
    segment.lineTo(sx+ARROW, sy+HEIGHT);
    segment.lineTo(sx, sy+halfh);

    return segment;
  }

  return {
    draw: draw
  }
}