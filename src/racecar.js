function Racecar() {
  'use strict';

  var SCREEN_WIDTH = 320;
  var SCREEN_HEIGHT = 240;

  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;

  var IMAGE_FONT = 'images/font.png';
  var IMAGE_MASK = 'images/mask.png';

  var keyb = Keyboard();

  var canvas = Canvas('canvas', SCREEN_WIDTH, SCREEN_HEIGHT);

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

  var sprites = Sprites();

  var gameMode = 0;
  
  var score = 0;

  Resources().load([IMAGE_MASK],
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

    var player = {
      c: 2,
      r: 4
    };

    console.log('Starting the game!');

    gameLoop();

    function gameLoop() {
      update(1000/60);
      draw();

      //setTimeout(gameLoop, 1000/60);
      setTimeout(gameLoop, 500);
    }

    function update(dt) {
      //updateLevel(dt);
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
        if (--player.c < 0) player.c = 0;
      }
      else if (keyb.isPressed(KEY_RIGHT)) {
        keyb.setRead(KEY_RIGHT);
        if (++player.c > 4) player.c = 4;
      }
    }

    function draw() {
      canvas.clear(resourceMap[IMAGE_MASK]);

      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.game[gameMode]);

      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[0][0]);
      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[1][1]);
      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[2][3]);
      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[3][3]);
      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[4][7]);

      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.player[player.c]);
    }

  }

}