function Racecar() {
  'use strict';

  var SCREEN_WIDTH = 320;
  var SCREEN_HEIGHT = 240;

  var IMAGE_MASK = 'images/mask.png';

  var keyb = Keyboard();
  var canvas = Canvas('canvas', SCREEN_WIDTH, SCREEN_HEIGHT);
  var sprites = Sprites();

  var idleScene = SceneIdle();
  var modeSelectionScene = SceneModeSelection();
  var playingScene = ScenePlaying();

  var scene = idleScene;

  var state = {
    player: 2,
    showCrash: false,
    crashed: false,
    resumePlay: false,
    gameOver: false,
    crashes: 0,
    mode: 0,
    score: 0,

    opponents: [
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0,
      0,0,0,0,0
    ],

    clock: {
      hh: [0, 1],
      mm: [2, 3],
      seconds: 0,
      showClockSeparator: true
    } 
  };

  var requestAni = window.requestAnimationFrame;

  Resources().load([IMAGE_MASK],
    function (err, url) {
      if (err) return console.error('Could not load resource', err);
      console.log('Loaded', url);
    }, 
    function (err, resourceMap) {
      if (err) return console.error('Could not load all resources', err);
      console.log('Finished loading resources', resourceMap);

      startGame(resourceMap);
    });

  function startGame(resourceMap) {
    console.log('Starting the game!');

    gameLoop();

    function gameLoop() {
      update(1000/60);
      draw();
      requestAni(gameLoop);
    }

    function nextScene(current) {
      var next;

      if (current === idleScene) next = modeSelectionScene;
      else if (current === modeSelectionScene) next = playingScene;
      else if (current === playingScene) next = idleScene;
      else throw 'Do not know which scene to change too. Current scene is ' + current.id;

      console.log('Changing from state', current.id, 'to', next.id);
      return next;
    }

    function update(dt) {
      var finished = scene.update(state, keyb, sprites, dt);

      if (finished) scene = nextScene(scene);
    }

    function draw() {
      canvas.clear(resourceMap[IMAGE_MASK]);

      sprites.enabled.forEach(function (enabled, spriteIndex) {
        if (enabled) canvas.drawSprite(resourceMap[IMAGE_MASK], sprites.byIndex(spriteIndex));
      });
    }
  }
}