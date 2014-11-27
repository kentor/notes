function BackgroundGenerator() {
  this.hue = Math.floor(Math.random()*360);
  this.color = 'hsl(' + this.hue + ',100%,87.5%)';
  this.pattern = this.PATTERNS[Math.floor(Math.random()*this.PATTERNS.length)];
}

BackgroundGenerator.prototype = {
  PATTERNS: ['checkerboard', 'dots', 'striped'],

  toStyle: function() {
    if (this.style) {
      return this.style;
    }

    this.style = this['_' + this.pattern]();
    return this.style;
  },

  _checkerboard: function() {
    var backgroundImage = 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,.2) 25%, rgba(255,255,255,.2) 75%, transparent 75%, transparent)';
    backgroundImage = backgroundImage + ',' + backgroundImage;
    return {
      'backgroundColor': this.color,
      'backgroundImage': backgroundImage,
      'backgroundPosition': '0 0, 15px 15px',
      'backgroundSize': '30px 30px',
    };
  },

  _dots: function() {
    var backgroundImage = 'radial-gradient(rgba(255,255,255,.2) 25%, transparent 25%)';
    backgroundImage = backgroundImage + ',' + backgroundImage;
    return {
      'backgroundColor': this.color,
      'backgroundImage': backgroundImage,
      'backgroundPosition': '0 0, 15px 15px',
      'backgroundSize': '30px 30px',
    };
  },

  _striped: function() {
    return {
      'backgroundColor': this.color,
      'backgroundImage': 'repeating-linear-gradient(135deg, transparent, transparent 11px, rgba(255,255,255,.2) 11px, rgba(255,255,255,.2) 22px)',
    };
  },
};

module.exports = BackgroundGenerator;
