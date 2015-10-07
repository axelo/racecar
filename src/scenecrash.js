function SceneCrash() {
  'use strict';

  function update(state, keyb, sprites, dt) {

    updateSprites(state, sprites);
  }

  function updateSprites(state, sprites) {
    //sprites.clear();

    sprites.crash[0]();
    sprites.crash[1]();
    sprites.crash[2]();
    sprites.crash[3]();
    sprites.crash[4]();
  }

  return {
    id: 'Crash',
    update: update
  };
}