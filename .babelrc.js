module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {browsers: ['last 2 Chrome versions']}}],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ],
  plugins: ['styled-jsx/babel'],
};
