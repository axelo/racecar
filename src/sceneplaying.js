function ScenePlaying() {
  'use strict';

  var inputLagFrameTime = 160;
  var deltaInputLagFrameTime = 200;

  var minFrameTime = 400;
  var frameTime = 600;
  var deltaTime = 0;

  var spawns = [
    generateSpawns([10, 10, 5, 5, 1]),
    generateSpawns([5, 10, 7, 5, 3])
  ];

  function generateSpawns(samples) {

    function withNoOfBits(b) {
      var nums = [];
      for (var i = 0; i < 2*2*2*2*2; ++i) {
        var c = 0;
        for (var j = 0; j < 5; ++j) if ((i >>> j) & 1) ++c;
        if (c === b) nums.push(i);
      }
      return nums;
    }

    var s = [
      0,
      withNoOfBits(1),
      withNoOfBits(2),
      withNoOfBits(3),
      withNoOfBits(4)
    ];

    var rows = [];

    for (var i = 0; i < 5; ++i) {
      for (var j = 0; j < samples[i]; j++) {
        rows.push(s[i][Math.floor(Math.random() * s[i].length)]);
      }
    }

    return rows;
  }

  function update(state, keyb, sound, sprites, dt) {
    deltaTime += dt;

    if (state.gameOver) {
      if (updateGameOver(state, keyb, sound, sprites, dt)) return true;
    } else if (state.resumePlay) {
      updateResume(state, keyb, sound, sprites, dt);
    } else if (state.crashed) {
      updateCrash(state, keyb, sound, sprites, dt);
    } else {
      updatePlay(state, keyb, sound, sprites, dt);
    }

    updateSprites(state, sprites);
  }

  function updateGameOver(state, keyb, sound, sprites, dt) {
    if (deltaTime >= 480) {
      deltaTime = 0;
      state.showCrash = !state.showCrash;
    }

    if (state.crashSoundDone && keyb.isPressed(keyb.KEY_RETURN)) {
      keyb.setRead(keyb.KEY_RETURN);

      state.gameOver = false,
      state.crashes = 0;
      state.score = 0;

      return true;
    }
  }

  function updateResume(state, keyb, sound, sprites, dt) {
    for (var i = 4*5-5; i < 4*5; ++i) state.opponents[i] = 0;

    if (keyb.isPressed(keyb.KEY_LEFT)) {
      keyb.setRead(keyb.KEY_LEFT);
      if (state.player > 0) {
        --state.player;
        state.resumePlay = false;
      }
    }
    else if (keyb.isPressed(keyb.KEY_RIGHT)) {
      keyb.setRead(keyb.KEY_RIGHT);
      if (state.player < 4) {
        ++state.player;
        state.resumePlay = false;
      }
    }
    else if (keyb.isPressed(keyb.KEY_RETURN)) {
      keyb.setRead(keyb.KEY_RETURN);
      state.resumePlay = false;
    }
  }

  function updateCrash(state, keyb, sound, sprites, dt) {
    if (deltaTime >= 480) {
      deltaTime = 0;
      state.showCrash = !state.showCrash;
    }

    if (state.crashSoundDone) {
      keyb.clear();

      state.resumePlay = true;
      state.crashed = false;
    }
  }

  function updatePlay(state, keyb, sound, sprites, dt) {

    deltaInputLagFrameTime += dt;

    if (deltaInputLagFrameTime >= inputLagFrameTime) {
      deltaInputLagFrameTime = 0;

      var prevPlayer = state.player;

      if (keyb.isPressed(keyb.KEY_LEFT)) {
        keyb.setRead(keyb.KEY_LEFT);
        if (--state.player < 0) state.player = 0;
      }
      else if (keyb.isPressed(keyb.KEY_RIGHT)) {
        keyb.setRead(keyb.KEY_RIGHT);
        if (++state.player > 4) state.player = 4;
      }

      if (state.player !== prevPlayer) {
        sound.play(400, 0, 0.05);
      }
    }

    if (deltaTime >= frameTime) {
      deltaTime = 0;

      // Check coll
      var opponentsOnLastRow = 0;
      var collision = false;

      for (var k = state.opponents.length - 5; k < state.opponents.length; ++k) {
        if (state.opponents[k] === 1) {
          ++opponentsOnLastRow;
          if (state.player === (k % 5)) collision = true;
        }
      }

      if (opponentsOnLastRow > 0 && !collision) {
        state.score += opponentsOnLastRow;

        if ((state.score % 10) === 0) {
          frameTime -= 20;

          if (frameTime < minFrameTime) frameTime = minFrameTime;
        }

      }

      if (collision) {
        state.crashed = true;
        state.showCrash = true;
        state.crashSoundDone = false;

        ++state.crashes;

        if (state.crashes > 3) {
          state.crashes = 3;
          state.gameOver = true;
        }

        var notes = state.gameOver 
          ? [530, 0, 0.4, 500, 0.1, 0.4, 490, 0.1, 0.4, 480, 0.1, 0.4, 470, 0.1, 0.4, 460, 0.1, 0.4, 440, 0.1, 0.4]
          : [530, 0, 0.3, 300, 0.1, 0.3, 400, 0.1, 0.5, 0, 0.1, 0.2];

        sound.playNotes(notes, function () {
          state.crashSoundDone = true;
        });

      }
      else {
        // Mpve opponents
        for (var i = state.opponents.length - 1; i >= 5; --i) {
          state.opponents[i] = state.opponents[i - 5];
        }

        var newRow = spawns[state.mode][Math.floor(Math.random() * spawns[state.mode].length)];

        for (var j = 0; j < 5; ++j) {
          state.opponents[j] = (newRow >>> j) & 1;
        }

        sound.play(312, 0, 0.05);
      }
    }
  }

  function updateSprites(state, sprites) {
    sprites.clear();

    var bcd000 = Math.floor(state.score / 100) % 10;
    var bcd00 =  Math.floor(state.score / 10) % 10;
    var bcd0 = Math.floor(state.score) % 10;

    if (bcd000 > 0) sprites.segment[2][bcd000]();
    if (bcd000 > 0 || bcd00 > 0) sprites.segment[3][bcd00]();
    sprites.segment[4][bcd0]();

    sprites.game[state.mode]();

    for (var c = 0; c < state.crashes; ++c) sprites.hit[c]();

    for (var i = 0; i < state.opponents.length; ++i) {
      if (state.opponents[i] === 1) {
        sprites.opponent[Math.floor(i / 5)][i % 5]();
      }
    }

    if (state.crashed && state.showCrash) sprites.crash[state.player]();

    if (state.gameOver) sprites.gameover();

    sprites.player[state.player]();
  }

  return {
    id: 'Playing',
    update: update
  };
}