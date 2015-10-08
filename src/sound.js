function Sound() {
  'use strict';

  var audioCtx = new window.AudioContext();
  var gainNode = audioCtx.createGain();
  // var distortion = audioCtx.createWaveShaper();

  gainNode.connect(audioCtx.destination); // connecting the different audio graph nodes together
  gainNode.gain.value = 0.1;

  function play(hz, delay, length, onended) {
    var osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = hz;

    var filter = audioCtx.createBiquadFilter();
    filter.frequency.value = hz; // in Hertz
    filter.type = "notch"; // 0

    osc.connect(filter);
    filter.connect(gainNode);

    osc.start(audioCtx.currentTime + delay);
    osc.stop(audioCtx.currentTime + delay + length);

    if (onended) osc.onended = onended;
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

    if (lastNode && onended) lastNode.onended = onended;
  }

  return {
    play: play,
    playNotes: playNotes
  }
}