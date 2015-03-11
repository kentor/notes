var FilterActions = require('../actions/FilterActions');
var FilterStore = require('../stores/FilterStore');
var React = require('react');

var FilterBox = React.createClass({
  getInitialState() {
    return { filter: FilterStore.filter() };
  },

  handleChange: function(filter) {
    this.setState({ filter });
    FilterActions.setFilter(filter);
  },

  render() {
    var valueLink = {
      value: this.state.filter,
      requestChange: this.handleChange,
    };

    return (
      <div>
        <input type="text" valueLink={valueLink} />
      </div>
    );
  },
});

module.exports = FilterBox;
