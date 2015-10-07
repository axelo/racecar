function Canvas(elementId, width, height) {
  'use strict';

  var canvasEl = document.getElementById(elementId);
  var ctx = canvasEl.getContext('2d');

  function setCanvasHdpi() {
    var ratio = (window.devicePixelRatio || 1) / (ctx.backingStorePixelRatio ||
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1);

    canvasEl.style.width = width + 'px';
    canvasEl.style.height = height + 'px';
    
    canvasEl.width = width * ratio;
    canvasEl.height = height * ratio;

    var scaleFactor = ratio;

    ctx.scale(scaleFactor, scaleFactor);
  }

  function clear(maskImage) {
    ctx.fillStyle = '#86acbb';
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = 0.03;
    ctx.drawImage(maskImage, 0, 0);
    ctx.globalAlpha = 1.0;
  }

  function drawSprite(maskImage, sprite) {
    var x = sprite[0];
    var y = sprite[1];
    var w = sprite[2];
    var h = sprite[3];

    // image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    ctx.drawImage(maskImage, x, y, w, h, x, y, w, h);
  }

  setCanvasHdpi();

  return {
    clear: clear,
    drawSprite: drawSprite,
  }
}