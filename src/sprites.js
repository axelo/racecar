function Sprites() {
  'use strict';

  function clear() {
    enabledSprites.forEach(function (enabled, spriteIndex) {
      enabledSprites[spriteIndex] = false;
    });
  }

  function addSprite(sprite) {
    allSprites.push(sprite);
    return allSprites.length - 1;
  }

  function enable(spriteIndices) {
    return function (clear) {
      spriteIndices.forEach(function (spriteIndex) {
        enabledSprites[spriteIndex] = !clear;
      });
    };
  }

  function byIndex(spriteIndex) {
    return allSprites[spriteIndex];
  }

  var allSprites = [];
  var enabledSprites = [];

  var GAME_A = addSprite([0, 2, 60, 12]);
  var GAME_B = addSprite([0, 2+12, 60, 12]);

  var SEGMENT_0_0 = addSprite([235, 2, 10, 2]);
  var SEGMENT_0_1 = addSprite([234, 4, 2, 10]);
  var SEGMENT_0_2 = addSprite([244, 4, 2, 10]);
  var SEGMENT_0_3 = addSprite([235, 14, 10, 2]);
  var SEGMENT_0_4 = addSprite([234, 16, 2, 9]);
  var SEGMENT_0_5 = addSprite([244, 16, 2, 9]);
  var SEGMENT_0_6 = addSprite([235, 25, 10, 2]);

  var SEGMENT_1_0 = addSprite([14+235, 2, 10, 2]);
  var SEGMENT_1_1 = addSprite([14+234, 4, 2, 10]);
  var SEGMENT_1_2 = addSprite([14+244, 4, 2, 10]);
  var SEGMENT_1_3 = addSprite([14+235, 14, 10, 2]);
  var SEGMENT_1_4 = addSprite([14+234, 16, 2, 9]);
  var SEGMENT_1_5 = addSprite([14+244, 16, 2, 9]);
  var SEGMENT_1_6 = addSprite([14+235, 25, 10, 2]);

  var SEGMENT_2_0 = addSprite([36+235, 2, 10, 2]);
  var SEGMENT_2_1 = addSprite([36+234, 4, 2, 10]);
  var SEGMENT_2_2 = addSprite([36+244, 4, 2, 10]);
  var SEGMENT_2_3 = addSprite([36+235, 14, 10, 2]);
  var SEGMENT_2_4 = addSprite([36+234, 16, 2, 9]);
  var SEGMENT_2_5 = addSprite([36+244, 16, 2, 9]);
  var SEGMENT_2_6 = addSprite([36+235, 25, 10, 2]);

  var SEGMENT_3_0 = addSprite([50+235, 2, 10, 2]);
  var SEGMENT_3_1 = addSprite([50+234, 4, 2, 10]);
  var SEGMENT_3_2 = addSprite([50+244, 4, 2, 10]);
  var SEGMENT_3_3 = addSprite([50+235, 14, 10, 2]);
  var SEGMENT_3_4 = addSprite([50+234, 16, 2, 9]);
  var SEGMENT_3_5 = addSprite([50+244, 16, 2, 9]);
  var SEGMENT_3_6 = addSprite([50+235, 25, 10, 2]);

  var SEGMENT_4_0 = addSprite([64+235, 2, 10, 2]);
  var SEGMENT_4_1 = addSprite([64+234, 4, 2, 10]);
  var SEGMENT_4_2 = addSprite([64+244, 4, 2, 10]);
  var SEGMENT_4_3 = addSprite([64+235, 14, 10, 2]);
  var SEGMENT_4_4 = addSprite([64+234, 16, 2, 9]);
  var SEGMENT_4_5 = addSprite([64+244, 16, 2, 9]);
  var SEGMENT_4_6 = addSprite([64+235, 25, 10, 2]);

  var COLON = addSprite([264, 8, 2, 14]);

  var HIT_0 = addSprite([0*49, 34, 49, 20]);
  var HIT_1 = addSprite([1*49, 34, 49, 20]);
  var HIT_2 = addSprite([2*49, 34, 49, 20]);
  var HIT_3 = addSprite([3*49, 34, 49, 20]);
  var HIT_4 = addSprite([4*49, 34, 49, 20]);

  var GAME_OVER = addSprite([129, 70, 61, 44]);

  var OPPONENT_0_0 = addSprite([0*8+140, 128, 8, 2]);
  var OPPONENT_0_1 = addSprite([1*8+140, 128, 8, 2]);
  var OPPONENT_0_2 = addSprite([2*8+140, 128, 8, 2]);
  var OPPONENT_0_3 = addSprite([3*8+140, 128, 8, 2]);
  var OPPONENT_0_4 = addSprite([4*8+140, 128, 8, 2]);

  var OPPONENT_1_0 = addSprite([0*16+120, 141, 16, 4]);
  var OPPONENT_1_1 = addSprite([1*16+120, 141, 16, 4]);
  var OPPONENT_1_2 = addSprite([2*16+120, 141, 16, 4]);
  var OPPONENT_1_3 = addSprite([3*16+120, 141, 16, 4]);
  var OPPONENT_1_4 = addSprite([4*16+120, 141, 16, 4]);

  var OPPONENT_2_0 = addSprite([0*32+80, 158, 32, 8]);
  var OPPONENT_2_1 = addSprite([1*32+80, 158, 32, 8]);
  var OPPONENT_2_2 = addSprite([2*32+80, 158, 32, 8]);
  var OPPONENT_2_3 = addSprite([3*32+80, 158, 32, 8]);
  var OPPONENT_2_4 = addSprite([4*32+80, 158, 32, 8]);

  var OPPONENT_3_0 = addSprite([0*48+40, 182, 48, 11]);
  var OPPONENT_3_1 = addSprite([1*48+40, 182, 48, 11]);
  var OPPONENT_3_2 = addSprite([2*48+40, 182, 48, 11]);
  var OPPONENT_3_3 = addSprite([3*48+40, 182, 48, 11]);
  var OPPONENT_3_4 = addSprite([4*48+40, 182, 48, 11]);

  var CRASH_0 = addSprite([0*56+20, 193, 56, 16]);
  var CRASH_1 = addSprite([1*56+20, 193, 56, 16]);
  var CRASH_2 = addSprite([2*56+20, 193, 56, 16]);
  var CRASH_3 = addSprite([3*56+20, 193, 56, 16]);
  var CRASH_4 = addSprite([4*56+20, 193, 56, 16]);

  var PLAYER_0 = addSprite([0*64, 210, 64, 15]);
  var PLAYER_1 = addSprite([1*64, 210, 64, 15]);
  var PLAYER_2 = addSprite([2*64, 210, 64, 15]);
  var PLAYER_3 = addSprite([3*64, 210, 64, 15]);
  var PLAYER_4 = addSprite([4*64, 210, 64, 15]);

  return {
    clear: clear,

    game: [
      enable([GAME_A]),
      enable([GAME_B])
    ],

    segment: [
      [
        enable([SEGMENT_0_0, SEGMENT_0_1, SEGMENT_0_2, SEGMENT_0_4, SEGMENT_0_5, SEGMENT_0_6]),
        enable([SEGMENT_0_2, SEGMENT_0_5]),
        enable([SEGMENT_0_0, SEGMENT_0_2, SEGMENT_0_3, SEGMENT_0_4, SEGMENT_0_6]),
        enable([SEGMENT_0_0, SEGMENT_0_2, SEGMENT_0_3, SEGMENT_0_5, SEGMENT_0_6]),
        enable([SEGMENT_0_1, SEGMENT_0_2, SEGMENT_0_3, SEGMENT_0_5]),
        enable([SEGMENT_0_0, SEGMENT_0_1, SEGMENT_0_3, SEGMENT_0_5, SEGMENT_0_6]),
        enable([SEGMENT_0_0, SEGMENT_0_1, SEGMENT_0_3, SEGMENT_0_4, SEGMENT_0_5, SEGMENT_0_6]),
        enable([SEGMENT_0_0, SEGMENT_0_2, SEGMENT_0_5]),
        enable([SEGMENT_0_0, SEGMENT_0_1, SEGMENT_0_2, SEGMENT_0_3, SEGMENT_0_4, SEGMENT_0_5, SEGMENT_0_6]),
        enable([SEGMENT_0_0, SEGMENT_0_1, SEGMENT_0_2, SEGMENT_0_3, SEGMENT_0_5, SEGMENT_0_6])
      ],
      [
        enable([SEGMENT_1_0, SEGMENT_1_1, SEGMENT_1_2, SEGMENT_1_4, SEGMENT_1_5, SEGMENT_1_6]),
        enable([SEGMENT_1_2, SEGMENT_1_5]),
        enable([SEGMENT_1_0, SEGMENT_1_2, SEGMENT_1_3, SEGMENT_1_4, SEGMENT_1_6]),
        enable([SEGMENT_1_0, SEGMENT_1_2, SEGMENT_1_3, SEGMENT_1_5, SEGMENT_1_6]),
        enable([SEGMENT_1_1, SEGMENT_1_2, SEGMENT_1_3, SEGMENT_1_5]),
        enable([SEGMENT_1_0, SEGMENT_1_1, SEGMENT_1_3, SEGMENT_1_5, SEGMENT_1_6]),
        enable([SEGMENT_1_0, SEGMENT_1_1, SEGMENT_1_3, SEGMENT_1_4, SEGMENT_1_5, SEGMENT_1_6]),
        enable([SEGMENT_1_0, SEGMENT_1_2, SEGMENT_1_5]),
        enable([SEGMENT_1_0, SEGMENT_1_1, SEGMENT_1_2, SEGMENT_1_3, SEGMENT_1_4, SEGMENT_1_5, SEGMENT_1_6]),
        enable([SEGMENT_1_0, SEGMENT_1_1, SEGMENT_1_2, SEGMENT_1_3, SEGMENT_1_5, SEGMENT_1_6])
      ],
      [
        enable([SEGMENT_2_0, SEGMENT_2_1, SEGMENT_2_2, SEGMENT_2_4, SEGMENT_2_5, SEGMENT_2_6]),
        enable([SEGMENT_2_2, SEGMENT_2_5]),
        enable([SEGMENT_2_0, SEGMENT_2_2, SEGMENT_2_3, SEGMENT_2_4, SEGMENT_2_6]),
        enable([SEGMENT_2_0, SEGMENT_2_2, SEGMENT_2_3, SEGMENT_2_5, SEGMENT_2_6]),
        enable([SEGMENT_2_1, SEGMENT_2_2, SEGMENT_2_3, SEGMENT_2_5]),
        enable([SEGMENT_2_0, SEGMENT_2_1, SEGMENT_2_3, SEGMENT_2_5, SEGMENT_2_6]),
        enable([SEGMENT_2_0, SEGMENT_2_1, SEGMENT_2_3, SEGMENT_2_4, SEGMENT_2_5, SEGMENT_2_6]),
        enable([SEGMENT_2_0, SEGMENT_2_2, SEGMENT_2_5]),
        enable([SEGMENT_2_0, SEGMENT_2_1, SEGMENT_2_2, SEGMENT_2_3, SEGMENT_2_4, SEGMENT_2_5, SEGMENT_2_6]),
        enable([SEGMENT_2_0, SEGMENT_2_1, SEGMENT_2_2, SEGMENT_2_3, SEGMENT_2_5, SEGMENT_2_6])
      ],
      [
        enable([SEGMENT_3_0, SEGMENT_3_1, SEGMENT_3_2, SEGMENT_3_4, SEGMENT_3_5, SEGMENT_3_6]),
        enable([SEGMENT_3_2, SEGMENT_3_5]),
        enable([SEGMENT_3_0, SEGMENT_3_2, SEGMENT_3_3, SEGMENT_3_4, SEGMENT_3_6]),
        enable([SEGMENT_3_0, SEGMENT_3_2, SEGMENT_3_3, SEGMENT_3_5, SEGMENT_3_6]),
        enable([SEGMENT_3_1, SEGMENT_3_2, SEGMENT_3_3, SEGMENT_3_5]),
        enable([SEGMENT_3_0, SEGMENT_3_1, SEGMENT_3_3, SEGMENT_3_5, SEGMENT_3_6]),
        enable([SEGMENT_3_0, SEGMENT_3_1, SEGMENT_3_3, SEGMENT_3_4, SEGMENT_3_5, SEGMENT_3_6]),
        enable([SEGMENT_3_0, SEGMENT_3_2, SEGMENT_3_5]),
        enable([SEGMENT_3_0, SEGMENT_3_1, SEGMENT_3_2, SEGMENT_3_3, SEGMENT_3_4, SEGMENT_3_5, SEGMENT_3_6]),
        enable([SEGMENT_3_0, SEGMENT_3_1, SEGMENT_3_2, SEGMENT_3_3, SEGMENT_3_5, SEGMENT_3_6])
      ],
      [
        enable([SEGMENT_4_0, SEGMENT_4_1, SEGMENT_4_2, SEGMENT_4_4, SEGMENT_4_5, SEGMENT_4_6]),
        enable([SEGMENT_4_2, SEGMENT_4_5]),
        enable([SEGMENT_4_0, SEGMENT_4_2, SEGMENT_4_3, SEGMENT_4_4, SEGMENT_4_6]),
        enable([SEGMENT_4_0, SEGMENT_4_2, SEGMENT_4_3, SEGMENT_4_5, SEGMENT_4_6]),
        enable([SEGMENT_4_1, SEGMENT_4_2, SEGMENT_4_3, SEGMENT_4_5]),
        enable([SEGMENT_4_0, SEGMENT_4_1, SEGMENT_4_3, SEGMENT_4_5, SEGMENT_4_6]),
        enable([SEGMENT_4_0, SEGMENT_4_1, SEGMENT_4_3, SEGMENT_4_4, SEGMENT_4_5, SEGMENT_4_6]),
        enable([SEGMENT_4_0, SEGMENT_4_2, SEGMENT_4_5]),
        enable([SEGMENT_4_0, SEGMENT_4_1, SEGMENT_4_2, SEGMENT_4_3, SEGMENT_4_4, SEGMENT_4_5, SEGMENT_4_6]),
        enable([SEGMENT_4_0, SEGMENT_4_1, SEGMENT_4_2, SEGMENT_4_3, SEGMENT_4_5, SEGMENT_4_6])
      ]
    ],

    colon: enable([COLON]),

    hit: [
      enable([HIT_0]),
      enable([HIT_1]),
      enable([HIT_2]),
      enable([HIT_3]),
      enable([HIT_4]),
    ],

    gameover: enable([GAME_OVER]),

    opponent: [
      [
        enable([OPPONENT_0_0]), 
        enable([OPPONENT_0_1]), 
        enable([OPPONENT_0_2]), 
        enable([OPPONENT_0_3]), 
        enable([OPPONENT_0_4])
      ],
      [
        enable([OPPONENT_1_0]), 
        enable([OPPONENT_1_1]), 
        enable([OPPONENT_1_2]), 
        enable([OPPONENT_1_3]), 
        enable([OPPONENT_1_4])
      ],
      [
        enable([OPPONENT_2_0]), 
        enable([OPPONENT_2_1]), 
        enable([OPPONENT_2_2]), 
        enable([OPPONENT_2_3]), 
        enable([OPPONENT_2_4])
      ],
      [
        enable([OPPONENT_3_0]), 
        enable([OPPONENT_3_1]), 
        enable([OPPONENT_3_2]), 
        enable([OPPONENT_3_3]), 
        enable([OPPONENT_3_4])
      ]
    ],

    crash: [
      enable([CRASH_0]),
      enable([CRASH_1]),
      enable([CRASH_2]),
      enable([CRASH_3]),
      enable([CRASH_4])
    ],

    player: [
      enable([PLAYER_0]),
      enable([PLAYER_1]),
      enable([PLAYER_2]),
      enable([PLAYER_3]),
      enable([PLAYER_4]),
    ],

    enabled: enabledSprites,
    byIndex: byIndex
  };
}