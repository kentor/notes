const PATTERNS = [
  'checkerboard',
  'dots',
  'stripes',
];

const cache = {};

export default function background(id) {
  if (!cache[id]) {
    cache[id] = {
      hue: Math.floor(Math.random() * 360),
      pattern: PATTERNS[Math.floor(Math.random() * PATTERNS.length)],
    };
  }

  return cache[id];
}
