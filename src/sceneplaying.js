function ScenePlaying() {
  'use strict';

  var frameTime = 0;

  function update(state, keyb, dt) {
    if (keyb.isPressed(keyb.KEY_LEFT)) {
      keyb.setRead(keyb.KEY_LEFT);
      if (--state.player < 0) state.player = 0;
    }
    else if (keyb.isPressed(keyb.KEY_RIGHT)) {
      keyb.setRead(keyb.KEY_RIGHT);
      if (++state.player > 4) state.player = 4;
    }

    frameTime += dt;

    if (frameTime >= 1000) {
      frameTime = 0;
      ++state.score;
    }
  }

  function draw(state, sprites) {
    sprites.clear();

    var bcd000 = Math.floor(state.score / 100) % 10;
    var bcd00 =  Math.floor(state.score / 10) % 10;
    var bcd0 = Math.floor(state.score) % 10;

    if (bcd000 > 0) sprites.segment[2][bcd000]();
    if (bcd000 > 0 || bcd00 > 0) sprites.segment[3][bcd00]();
    sprites.segment[4][bcd0]();

    sprites.game[state.mode]();
    sprites.player[state.player]();
  }

  return {
    id: 'Playing',
    update: update,
    draw: draw
  };
}