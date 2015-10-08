function SceneModeSelection() {
  'use strict';

  function update(state, keyb, sound, sprites, dt) {

    for (var i = 0; i < state.opponents.length; ++i) {
      state.opponents[i] = 0;
    }

    if (keyb.isPressed(keyb.KEY_RIGHT) || keyb.isPressed(keyb.KEY_LEFT)) {
      keyb.setRead(keyb.KEY_RIGHT);
      keyb.setRead(keyb.KEY_LEFT);

      state.mode = (state.mode + 1) & 1;
    }

    updateSprites(state, sprites);

    if (keyb.isPressed(keyb.KEY_RETURN)) {
      keyb.setRead(keyb.KEY_RETURN);
      return true;
    }
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