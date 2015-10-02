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
    [0,0,0,0,0],
    [0,0,1,1,0],
    [0,0,0,1,0],
    [0,1,0,1,0],
    [0,1,0,1,0],
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
    },
    player: 2,
    opponents: [
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0
    ],
    playerCrashed: false,
    spawnTime: 1000,
    deltaTime: 0
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
      update(250);
      draw();

      //setTimeout(gameLoop, 1000/60);
      setTimeout(gameLoop, 250);
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
      /*}
      state.deltaTime += dt;

      if (state.deltaTime >= state.spawnTime) {
        state.deltaTime = 0;*/

        /*for (var i = state.opponents.length - 1; i >= 5; --i) {
          state.opponents[i] = state.opponents[i - 5];
        }

        var unz = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 28]
        var index = Math.floor(Math.random() * unz.length);
      
        for (var j = 0; j < 5; ++j) {
          state.opponents[j] = (unz[index] >>> j) & 1;
        }*/

        if (state.opponents[5*3+state.player] === 1) {
          var mindist = 5;
          var safeIndex = -1;

          for (var k = 5*3; k < 5*4; ++k) {
            if (state.opponents[k] === 0) {
              var dist = Math.abs(state.player - (k % 5));
              if (dist < mindist) {
                mindist = dist;
                safeIndex = k % 5;
              }
              else if (dist === mindist) {
                if (Math.random() >= 0.5) safeIndex = k % 5;
              }
            } 
          }

          if (safeIndex >= 0) state.player += safeIndex < state.player ? -1 : 1;
        }

        state.playerCrashed = state.opponents[5*3+state.player] === 1;

        for (var i = state.opponents.length - 1; i >= 5; --i) {
          state.opponents[i] = state.opponents[i - 5];
        }

        for (var j = 0; j < 5; ++j) {
          state.opponents[4 - j] = (state.clock.seconds >>> j) & 1;
        }
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

      if (state.clock.seconds < 32) canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.game[0]);
      else canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.game[1]);

      for (var i = 0; i < state.opponents.length; ++i) {
        if (state.opponents[i] === 1) {
          canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.opponent[Math.floor(i / 5)][i % 5]);
        }
      }

      if (state.playerCrashed) {
        //canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.opponent[3][state.player]);
        canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.crash[state.player]);
      }

      canvas.drawSprites(resourceMap[IMAGE_MASK], sprites.player[state.player]);
    }

    function drawGameStateRunning() {

    }
  }

}