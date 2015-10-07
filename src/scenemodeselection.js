function SceneModeSelection() {
  'use strict';

  function update(state, keyb, sprites, dt) {

    for (var i = 0; i < state.opponents.length; ++i) {
      state.opponents[i] = 0;
    }

    if (keyb.isPressed(keyb.KEY_RIGHT)) {
      keyb.setRead(keyb.KEY_RIGHT);
      state.mode = (state.mode + 1) & 1;
    }

    if (keyb.isPressed(keyb.KEY_LEFT)) {
      keyb.setRead(keyb.KEY_LEFT);
      return true;
    }

    updateSprites(state, sprites);
  }

  function updateSprites(state, sprites) {
    sprites.clear();

    sprites.game[state.mode]();
    sprites.player[4]();
  }

  return {
    id: 'ModeSelection',
    update: update
  };
}