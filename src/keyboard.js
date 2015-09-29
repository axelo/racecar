function Keyboard() {
  'use strict';

  var keyDownMap = {};
  var keyUpMap = {};

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

  return {
    isPressed: isPressed, 
    setRead: setRead
  };
}