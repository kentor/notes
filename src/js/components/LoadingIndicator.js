import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

function *dotsCounter() {
  let x = 2;
  for (;;) {
    yield Math.round(Math.cos(x * Math.PI / 2)) + 2;
    x = (x + 1) % 4;
  }
}

const LoadingIndicator = React.createClass({
  mixins: [
    PureRenderMixin,
  ],

  getDefaultProps() {
    return { interval: 100 };
  },

  getInitialState() {
    this.dotsCounter = dotsCounter();
    return { dots: this.dotsCounter.next().value };
  },

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ dots: this.dotsCounter.next().value });
    }, this.props.interval);
  },

  componentWillUnmount() {
    clearInterval(this.timer);
  },

  render() {
    const { dots } = this.state;

    return (
      <span>
        <span>.</span>
        {dots >= 2 && <span>.</span>}
        {dots === 3 && <span>.</span>}
      </span>
    );
  },
});

export default LoadingIndicator;
