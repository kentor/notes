var PATTERNS = ['checkerboard', 'dots', 'striped'];

class BackgroundGenerator {
  constructor() {
    this.hue = Math.floor(Math.random()*360);
    this.pattern = PATTERNS[Math.floor(Math.random()*PATTERNS.length)];
  }

  toClassName() {
    return `${this.pattern} bg-${this.hue}`;
  }
}

module.exports = BackgroundGenerator;
