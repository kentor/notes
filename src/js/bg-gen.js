function BackgroundGenerator() {
  this.hue = Math.floor(Math.random()*360);
  this.pattern = this.PATTERNS[Math.floor(Math.random()*this.PATTERNS.length)];
}

BackgroundGenerator.prototype = {
  PATTERNS: ['checkerboard', 'dots', 'striped'],

  toClassName: function() {
    return this.pattern + '-' + this.hue;
  },
};

module.exports = BackgroundGenerator;
