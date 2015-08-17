const PATTERNS = ['checkerboard', 'dots', 'striped'];

const cache = {};

module.exports = function getBackground(id) {
  if (!cache[id]) {
    cache[id] = {
      hue: Math.floor(Math.random() * 360),
      pattern: PATTERNS[Math.floor(Math.random() * PATTERNS.length)],
    };
  }

  return cache[id];
};
