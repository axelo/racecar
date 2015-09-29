function Racecar() {
  'use strict';

  var segment = Segment();

  var SCREEN_WIDTH = 320;
  var SCREEN_HEIGHT = 240;

  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;

  var IMAGE_CAR = 'images/car.png';

  var canvasEl = setCanvasHdpi(document.getElementById('canvas'));

  var ctx = canvasEl.getContext('2d');

  var keyb = installKeybListener();

  var level = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [1,1,0,1,1],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,1,1,1],
    [0,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,0,0,0],
    [1,1,0,1,1],
    [0,0,0,0,0],
    [1,0,0,1,1],
    [0,0,0,0,0],
    [1,1,0,0,1],
    [0,0,0,0,0],
    [0,1,1,0,0],
  ];
  var levelRow = level.length;
  var levelSpeed = 1000/60 * 60 * 1;
  var levelDelay = 0;

  beginLoadResources([IMAGE_CAR],
    function (err, url) {
      if (err) return console.error('Could not load resource', err);
      console.log('Loaded', url);
    }, 
    function (err, resourceMap) {
      if (err) return console.error('Could not load all resources', err);
      console.log('Finished loading resources', resourceMap);

      startGame(resourceMap);
    });

  function startGame(resourceMap) {
    var levelSpriteMap = createLevelSprites();
    var playerSprites = createPlayerSprites();

    var allSprites = levelSpriteMap.reduce(function (a, b) {
      return a.concat(b);
    })
    .concat(playerSprites);

    var player = {
      c: 2,
      r: 4
    };

    console.log('Starting the game!');

    gameLoop();

    function gameLoop() {
      update(1000/60);
      draw();

      setTimeout(gameLoop, 1000/60);
    }

    function update(dt) {
      updateLevel(dt);
      updatePlayer(dt);
    }

    function updateLevel(dt) {
      if (levelRow <= 0) {
        console.log('End of level reached!');
        return;
      }

      levelDelay += dt;
      if (levelDelay < levelSpeed) return;

      levelDelay = 0;

      for (var r = 2; r >= 0; --r) {
        for (var c = 0; c < 5; ++c) {
          levelSpriteMap[r+1][c].on = levelSpriteMap[r][c].on;
        }
      }

      var nextRow = level[--levelRow];
      
      for (var c = 0; c < 5; ++c) {
        levelSpriteMap[0][c].on = nextRow[c] === 1;
      }

    }

    function updatePlayer(dt) {
      if (keyb.isPressed(KEY_LEFT)) {
        keyb.setRead(KEY_LEFT);

        playerSprites[player.c].on = false;

        if (--player.c < 0) player.c = 0;
      }
      else if (keyb.isPressed(KEY_RIGHT)) {
        keyb.setRead(KEY_RIGHT);

        playerSprites[player.c].on = false;
      
        if (++player.c > 4) player.c = 4;
      }

      playerSprites[player.c].on = true;
    }

    function draw() {
      ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      //drawSprites();

      segment.draw(ctx);
    }

    function drawSprites() {
      for (var i = 0; i < allSprites.length; ++i) {
        drawSprite(allSprites[i]);
      }
    }

    function drawSprite(sprite) {
      var alpha = sprite.on
        ? 1.0
        : 0.1;

      ctx.globalAlpha = alpha;

      var img = resourceMap[sprite.resId];
      ctx.drawImage(img, sprite.x, sprite.y, sprite.w, sprite.h);
    }

    function createCarSpriteRow(y, z) {
      var img = resourceMap[IMAGE_CAR];
      var w = Math.floor(img.width * z);
      var h = Math.floor(img.height * z);
      var dx = w + 4;
      var sx = Math.floor((SCREEN_WIDTH - (dx * 5)) / 2);

      var col = [];

      for (var i = 0; i < 5; ++i) {
        col[i] = {
          resId: IMAGE_CAR,
          w: w,
          h: h,
          y: y,
          x: sx + i * dx,
          on: false
        }
      }

      return col;
    }

    function createPlayerSprites() {
      return createCarSpriteRow(200, 0.4);
    }

    function createLevelSprites() {
      var rows = [];

      rows[0] = createCarSpriteRow(110, 0.05);
      rows[1] = createCarSpriteRow(122, 0.1);
      rows[2] = createCarSpriteRow(140, 0.2);
      rows[3] = createCarSpriteRow(165, 0.3);

      return rows;
    }
  }

  function beginLoadResources(resources, progressCallback, finishedCallback) {

    var noOfResources = resources.length;
    var resourceMap = {};
    var failed;

    function success(url, loadedRes) {
      --noOfResources;

      resourceMap[url] = loadedRes;

      progressCallback(undefined, url);

      if (noOfResources <= 0) finishedCallback(failed, resourceMap);
    }

    function failure(url) {
      if (!failed) failed = [];
      failed.push({ url: url, cause: 'Unknown resource format'});

      --noOfResources;

      progressCallback(url);

      if (noOfResources <= 0) finishedCallback(failed, resourceMap);
    }

    resources.forEach(function (url) {

      if (url.endsWith('.png')) {
        var image = new Image();
        image.onload = function () { success(url, image); };
        image.onerror = function () { failure(url); };
        image.src = url;
      }
      else {
        failure(url);
      }

    });

  }

  function installKeybListener() {
    var keyDownMap = {};
    var keyUpMap = {};

    window.onkeydown = function (event) {
      keyUpMap[event.which] = false;

      if (keyDownMap[event.which] !== 2) keyDownMap[event.which] = true;
    }

    window.onkeyup = function (event) {
       keyUpMap[event.which] = true;

      if (keyDownMap[event.which] === 2) keyDownMap[event.which] = false;
    }

    function isPressed(which) {
      return keyDownMap[which] === true;
    }

    function setRead(which) {
      keyDownMap[which] = 2;

      if (keyUpMap[which] === true) keyDownMap[which] = false;
    }

    return { isPressed: isPressed, setRead: setRead };
  }

  function setCanvasHdpi(canvasEl) {
    var ctx = canvasEl.getContext('2d');
    var ratio = (window.devicePixelRatio || 1) / (ctx.backingStorePixelRatio ||
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1);

    var height = SCREEN_HEIGHT;
    var width = SCREEN_WIDTH;

    canvasEl.style.width = width + 'px';
    canvasEl.style.height = height + 'px';
    
    canvasEl.width = width * ratio;
    canvasEl.height = height * ratio;

    var scaleFactor = ratio;

    ctx.scale(scaleFactor, scaleFactor);

    return canvasEl;
  }

}