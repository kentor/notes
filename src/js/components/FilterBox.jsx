import FilterActions from '../actions/FilterActions';
import FilterStore from '../stores/FilterStore';
import React from 'react';

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

export default FilterBox;
