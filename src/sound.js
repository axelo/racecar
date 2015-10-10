function Sound() {
  'use strict';

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var gainNode = audioCtx.createGain();

  gainNode.connect(audioCtx.destination); // connecting the different audio graph nodes together
  gainNode.gain.value = 0.2;

  function play(hz, delay, length) {
    var osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = hz;

    var filter = audioCtx.createBiquadFilter();
    filter.frequency.value = hz; // in Hertz
    filter.type = 'notch';

    osc.connect(filter);
    filter.connect(gainNode);

    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + length);

    return osc;
  }

  function playNotes(notes, onended) {
    var aggregatedDelay = 0;
    var lastNode;

    for (var i = 0; i < notes.length; i += 3) {
      var hz = notes[i];
      var delay = notes[i+1];
      var length = notes[i+2];

      lastNode = play(hz, aggregatedDelay + delay, length);

      aggregatedDelay += delay + length;
    }

    if (lastNode && onended) window.setTimeout(onended, aggregatedDelay * 1000 + 16);
  }

  function playOnceOnClick(elId, hz, delay, length) {
    var el = document.getElementById(elId);
    el.addEventListener('click', doIt, false);

    function doIt() {
      el.removeEventListener('click', doIt, false);
      play(hz, delay, length);
    }
  }

  return {
    play: play,
    playNotes: playNotes,
    playOnceOnClick: playOnceOnClick
  }
}