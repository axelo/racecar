function Hud(keyb, steeringId, leftId, rightId, startId) {
  'use strict';

  var steeringEl = document.getElementById(steeringId);
  var leftEl = document.getElementById(leftId);
  var rightEl = document.getElementById(rightId);
  var startEl = document.getElementById(startId);

  var gotSteeringTouchStart = false;
  var gotStartTouchStart = false;

  steering.addEventListener('touchstart', function (event) {
    gotSteeringTouchStart = true;
    mapHudEventToKeyboard(event);
  }, false);

  steering.addEventListener('mousedown', function (event) {
    if (!gotSteeringTouchStart) mapHudEventToKeyboard(event);
    gotSteeringTouchStart = false;
  }, false);

  startEl.addEventListener('touchstart', function (event) {
    gotStartTouchStart = true;
    keyb.setPressed(keyb.KEY_RETURN);
  }, false);

  startEl.addEventListener('mousedown', function (event) {
    if (!gotStartTouchStart) keyb.setPressed(keyb.KEY_RETURN);
    gotStartTouchStart = false;
  }, false);

  window.addEventListener('touchend', function (event) {
    clear();
  }, false);

  window.addEventListener('mouseup', function (event) {
    clear();
  }, false);

  function clear() {
    keyb.setUnpressed(keyb.KEY_LEFT);
    keyb.setUnpressed(keyb.KEY_RIGHT);
    keyb.setUnpressed(keyb.KEY_RETURN);
  }

  function mapHudEventToKeyboard(event) {
    if (event.target === leftEl) return keyb.setPressed(keyb.KEY_LEFT);
    if (event.target === rightEl) return keyb.setPressed(keyb.KEY_RIGHT);

    var half = 320 / 2;
    var dmz = 4;

    if (event.layerX < (half - dmz)) keyb.setPressed(keyb.KEY_LEFT);
    if (event.layerX > (half + dmz)) keyb.setPressed(keyb.KEY_RIGHT);
  }

  function update() {
    if (keyb.isPressedNow(keyb.KEY_LEFT)) leftEl.classList.add('pressed');
    else leftEl.classList.remove('pressed');

    if (keyb.isPressedNow(keyb.KEY_RIGHT)) rightEl.classList.add('pressed');
    else rightEl.classList.remove('pressed');

    if (keyb.isPressedNow(keyb.KEY_RETURN)) startEl.classList.add('pressed');
    else startEl.classList.remove('pressed');
  }

  return {
    update: update
  };
}