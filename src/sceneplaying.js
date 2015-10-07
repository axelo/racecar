function ScenePlaying() {
  'use strict';

  var minFrameTime = 400;
  var frameTime = 1000;
  var deltaTime = 0;

  var spawns = [
    modeSpawns([10, 10, 5, 5, 1]),
    modeSpawns([5, 10, 7, 5, 3])
  ];

  function modeSpawns(samples) {

    function withNoOfBits(b) {
      var nums = [];
      for (var i = 0; i < 2*2*2*2*2; ++i) {
        var c = 0;
        for (var j = 0; j < 5; ++j) if ((i >>> j) & 1) ++c;
        if (c === b) nums.push(i);
      }
      return nums;
    }

    var rows = [];

    var s = [
      0,
      withNoOfBits(1),
      withNoOfBits(2),
      withNoOfBits(3),
      withNoOfBits(4),
    ];

    var totalNoOfSample = 0;

    for (var i = 0; i < 5; ++i) {
      for (var j = 0; j < samples[i]; j++) {
        rows.push(s[i][Math.floor(Math.random() * s[i].length)]);
      }
    }

    return rows;
  }

  function update(state, keyb, sprites, dt) {
    if (keyb.isPressed(keyb.KEY_LEFT)) {
      keyb.setRead(keyb.KEY_LEFT);
      if (--state.player < 0) state.player = 0;
    }
    else if (keyb.isPressed(keyb.KEY_RIGHT)) {
      keyb.setRead(keyb.KEY_RIGHT);
      if (++state.player > 4) state.player = 4;
    }

    deltaTime += dt;

    if (deltaTime >= frameTime) {
      deltaTime = 0;

      // Check coll
      var opponentOnLastRow = false;
      var collision = false;

      for (var k = state.opponents.length - 5; k < state.opponents.length; ++k) {
        if (state.opponents[k] === 1) {
          opponentOnLastRow = true;
          if (state.player === (k % 5)) collision = true;
        }
      }

      if (opponentOnLastRow && !collision) {
        ++state.score;

        if ((state.score % 10) === 0) {
          frameTime -= 50;

          if (frameTime < minFrameTime) frameTime = minFrameTime;
        }

      }

      if (collision) {
        state.crashed = true;
        ++state.crashes;
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
      }
    }

    updateSprites(state, sprites);

    if (collision) return true;
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

    for (var i = 0; i < state.opponents.length; ++i) {
      if (state.opponents[i] === 1) {
        sprites.opponent[Math.floor(i / 5)][i % 5]();
      }
    }

    sprites.player[state.player]();
  }

  return {
    id: 'Playing',
    update: update
  };
}