function SceneIdle() {

    function update(state, keyb, sprites, dt) {
      var now = new Date();
      var hh = now.getHours();
      var mm = now.getMinutes();
      var seconds = now.getSeconds();

      state.clock.hh[0] = Math.floor(hh / 10);
      state.clock.hh[1] = hh - state.clock.hh[0] * 10;
      state.clock.mm[0] = Math.floor(mm / 10);
      state.clock.mm[1] = mm - state.clock.mm[0] * 10;

      if (state.clock.seconds != seconds) {
        state.clock.seconds = seconds;
        state.clock.showClockSeparator = !state.clock.showClockSeparator;

        if (state.opponents[5*3+state.player] === 1) {
          var mindist = 5;
          var safeIndex = -1;

          for (var k = 5*3; k < 5*4; ++k) {
            if (state.opponents[k] === 0) {
              var dist = Math.abs(state.player - (k % 5));
              if (dist < mindist) {
                mindist = dist;
                safeIndex = k % 5;
              }
              else if (dist === mindist) {
                if (Math.random() >= 0.5) safeIndex = k % 5;
              }
            } 
          }

          if (safeIndex >= 0) state.player += safeIndex < state.player ? -1 : 1;
        }

        state.playerCrashed = state.opponents[5*3+state.player] === 1;

        for (var i = state.opponents.length - 1; i >= 5; --i) {
          state.opponents[i] = state.opponents[i - 5];
        }

        for (var j = 0; j < 5; ++j) {
          state.opponents[4 - j] = (state.clock.seconds >>> j) & 1;
        }
      }

      if (keyb.isPressed(keyb.KEY_RETURN)) {
        keyb.setRead(keyb.KEY_RETURN);
        return true;
      }

      updateSprites(state, sprites);
    }

    function updateSprites(state, sprites) {
      sprites.clear();

      if (state.clock.hh[0]) sprites.segment[0][state.clock.hh[0]]();
      sprites.segment[1][state.clock.hh[1]]();
      
      if (state.clock.showClockSeparator) sprites.colon();

      sprites.segment[2][state.clock.mm[0]]();
      sprites.segment[3][state.clock.mm[1]]();

      if (state.clock.seconds < 32) sprites.game[0]();
      else sprites.game[1]();

      for (var i = 0; i < state.opponents.length; ++i) {
        if (state.opponents[i] === 1) {
          sprites.opponent[Math.floor(i / 5)][i % 5]();
        }
      }

      if (state.playerCrashed) sprites.crash[state.player]();

      sprites.player[state.player]();
    }

    return {
      id: 'Idle',
      update: update
    };
}