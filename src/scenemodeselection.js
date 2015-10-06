function SceneModeSelection() {
  'use strict';

  function update(state, keyb, dt) {
    if (keyb.isPressed(keyb.KEY_RIGHT)) {
      keyb.setRead(keyb.KEY_RIGHT);
      state.mode = (state.mode + 1) & 1;
    }

    if (keyb.isPressed(keyb.KEY_LEFT)) {
      keyb.setRead(keyb.KEY_LEFT);
      return true;
    }
  }

  function draw(state, sprites) {
    sprites.clear();

    sprites.game[state.mode]();
    sprites.player[4]();
  }

  return {
    id: 'ModeSelection',
    update: update,
    draw: draw
  };
}