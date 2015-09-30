function Sprites() {
  'use strict';

  function crash(tx) {
    return [[tx+20, 193, 56, 16]];
  }

  function player(tx) {
    return [[tx, 210, 64, 15]];
  }

  function opponent0(tx) {
    return [[tx+140, 128, 8, 2]];
  }

  function opponent1(tx) {
    return [[tx+120, 141, 16, 4]];
  }

  function opponent2(tx) {
    return [[tx+80, 158, 32, 8]];
  }
  
  function opponent3(tx) {
    return [[tx+40, 182, 48, 11]];
  }

  function hit(tx) {
    return [[tx+0, 34, 49, 20]];
  }

  function digit0to9(tx) {
    return [
      [[tx+234, 2, 12, 12], [tx+234, 16, 12, 12]],
      [[tx+244, 4, 2, 10], [tx+244, 16, 2, 10]],
      [[tx+235, 2, 10, 2], [tx+244, 4, 2, 10], [tx+235, 14, 10, 2], [tx+234, 16, 2, 10], [tx+235, 25, 10, 2]],
      [[tx+235, 2, 10, 2], [tx+244, 4, 2, 10], [tx+235, 14, 10, 2], [tx+244, 16, 2, 9], [tx+235, 25, 10, 2]],
      [[tx+234, 4, 2, 10], [tx+244, 4, 2, 10], [tx+235, 14, 10, 2], [tx+244, 16, 2, 9]],
      [[tx+235, 2, 10, 2], [tx+234, 4, 2, 10], [tx+235, 14, 10, 2], [tx+244, 16, 2, 9], [tx+235, 25, 10, 2]],
      [[tx+235, 2, 10, 2], [tx+234, 4, 2, 10], [tx+234, 14, 12, 13]],
      [[tx+235, 2, 10, 2], [tx+244, 4, 2, 10], [tx+244, 16, 2, 10]],
      [[tx+234, 2, 12, 25]],
      [[tx+234, 2, 12, 14], [tx+244, 16, 2, 10], [tx+235, 25, 10, 2]]
    ];
  }

  return {
    game: [
      [[0, 2, 60, 12]],
      [[0, 2+12, 60, 12]]
    ],

    segment: [digit0to9(0), digit0to9(14), digit0to9(36), digit0to9(50), digit0to9(64)],

    colon: [[264, 8, 2, 14]],

    hit: [hit(0*49), hit(1*49), hit(2*49), hit(3*49)],

    gameover: [[129, 70, 61, 44]],

    opponent: [
      [opponent0(0*8), opponent0(1*8), opponent0(2*8), opponent0(3*8), opponent0(4*8)],
      [opponent1(0*16), opponent1(1*16), opponent1(2*16), opponent1(3*16), opponent1(4*16)],
      [opponent2(0*32), opponent2(1*32), opponent2(2*32), opponent2(3*32), opponent2(4*32)],
      [opponent3(0*48), opponent3(1*48), opponent3(2*48), opponent3(3*48), opponent3(4*48)]
    ],

    crash: [crash(0*56), crash(1*56), crash(2*56), crash(3*56), crash(4*56)],

    player: [player(0*64), player(1*64), player(2*64), player(3*64), player(4*64)]
  };
}