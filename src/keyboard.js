function Keyboard() {
  'use strict';

  var keyDownMap = [];
  var keyUpMap = [];
  var keyUnreadMap = [];

  var IS_READ = 2;

  window.addEventListener('keydown', function (event) {
    onKeydown(event.which);
  }, false);

  window.addEventListener('keyup', function (event) {
    onKeyup(event.which);
  });

  function onKeydown(which) {
    keyUpMap[which] = false;
    keyDownMap[which] = true;

    if (keyUnreadMap[which] !== IS_READ) keyUnreadMap[which] = true;
  }

  function onKeyup(which) {
     keyUpMap[which] = true;
     keyDownMap[which] = false;

    if (keyUnreadMap[which] === IS_READ) keyUnreadMap[which] = false;
  }

  function isPressed(which) {
    return keyUnreadMap[which] === true;
  }

  function isPressedNow(which) {
    return keyDownMap[which] === true;
  }

  function setRead(which) {
    keyUnreadMap[which] = IS_READ;

    if (keyUpMap[which] === true) keyUnreadMap[which] = false;
  }

  function clear() {
    for (var i = 0; i < keyUnreadMap.length; ++i) keyUnreadMap[i] = false;
  }

  function setPressed(which) {
    onKeydown(which);
  }

  function setUnpressed(which) {
    onKeyup(which);
  }

  return {
    isPressed: isPressed, 
    isPressedNow: isPressedNow,

    setRead: setRead,
    clear: clear,

    setPressed: setPressed,
    setUnpressed: setUnpressed,

    KEY_LEFT: 37,
    KEY_RIGHT: 39,
    KEY_RETURN: 13
  };
}