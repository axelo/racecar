function Keyboard() {
  'use strict';

  var keyDownMap = [];
  var keyUpMap = [];

  var IS_READ = 2;

  window.onkeydown = function (event) {
    keyUpMap[event.which] = false;

    if (keyDownMap[event.which] !== IS_READ) keyDownMap[event.which] = true;
  }

  window.onkeyup = function (event) {
     keyUpMap[event.which] = true;

    if (keyDownMap[event.which] === IS_READ) keyDownMap[event.which] = false;
  }

  function isPressed(which) {
    return keyDownMap[which] === true;
  }

  function setRead(which) {
    keyDownMap[which] = IS_READ;

    if (keyUpMap[which] === true) keyDownMap[which] = false;
  }

  function clear() {
    for (var i = 0; i < keyDownMap.length; ++i) keyDownMap[i] = false;
  }

  return {
    isPressed: isPressed, 
    setRead: setRead,
    clear: clear,

    KEY_LEFT: 37,
    KEY_RIGHT: 39,
    KEY_RETURN: 13
  };
}