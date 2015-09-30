function Racecar() {
  'use strict';

  var SCREEN_WIDTH = 320;
  var SCREEN_HEIGHT = 240;

  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;

  var IMAGE_FONT = 'images/font.png';
  var IMAGE_MASK = 'images/mask.png';

  var GAME_STATE_IDLE = 1;
  var GAME_STATE_WAIT_FOR_PLAYER = 2;
  var GAME_STATE_RUNNING = 3;
  var GAME_STATE_CRASHED = 4;
  var GAME_STATE_GAMEOVER = 5;

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

  var gameState = GAME_STATE_IDLE;

  var gameMode = 0;
  
  var score = 0;

  var player = {
    c: 2
  };

  var states = [];

  states[GAME_STATE_IDLE] = {
    clock: {
      hh: [0, 1],
      mm: [2, 3],
      seconds: 0,
      showClockSeparator: true
    }
  }

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
    console.log('Starting the game!');

    gameLoop();

    function gameLoop() {
      update(1000/60);
      draw();

      //setTimeout(gameLoop, 1000/60);
      setTimeout(gameLoop, 500);
    }

    function update(dt) {
      switch (gameState) {
        case GAME_STATE_IDLE: return updateGameStateIdle(dt);
        case GAME_STATE_RUNNING: return updateGameStateRunning(dt);
        default: console.error('Unown game state', gameState);
      }
    }

    function updateGameStateIdle(dt) {
      var state = states[GAME_STATE_IDLE];

      var now = new Date();
      var hh = now.getHours();
      var mm = now.getMinutes();
      var seconds = now.getSeconds();

      state.clock.hh[0] = Math.floor(hh / 10);
      state.clock.hh[1] = hh - state.clock.hh[0] * 10;
      state.clock.mm[0] = Math.floor(mm / 10);
      state.clock.mm[1] = mm - state.clock.mm[0] * 10;

      if (state.clock.seconds != seconds) {
        state.clock.seconds = seconds;
        state.clock.showClockSeparator = !state.clock.showClockSeparator;
      }
    }

    function updateGameStateRunning(dt) {
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

      switch (gameState) {
        case GAME_STATE_IDLE: return drawGameStateIdle();
        case GAME_STATE_RUNNING: return drawGameStateRunning();
        default: console.error('Unown game state', gameState);
      }
    }

    function drawGameStateIdle() {
      var state  = states[GAME_STATE_IDLE];

      if (state.clock.hh[0]) canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[0][state.clock.hh[0]]);
      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[1][state.clock.hh[1]]);
      
      if (state.clock.showClockSeparator) canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.colon);

      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[2][state.clock.mm[0]]);
      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.segment[3][state.clock.mm[1]]);
    }

    function drawGameStateRunning() {

    }
  }

}