import PureRenderMixin from 'react-addons-pure-render-mixin';
import React from 'react';

function *dotsCounter() {
  for (;;) {
    yield 1;
    yield 2;
    yield 3;
    yield 2;
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
