var Reflux = require('reflux');
var FilterActions = require('../actions/FilterActions');

var filter = '';
var filterRegexp = new RegExp();

function escapeRegexp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

var FilterStore = Reflux.createStore({
  listenables: FilterActions,

  filter() {
    return filter;
  },

  filterRegexp() {
    return filterRegexp;
  },

  onSetFilter(newFilter) {
    filter = newFilter;
    filterRegexp = new RegExp(escapeRegexp(newFilter), 'i');
    this.triggerAsync();
  },
});

module.exports = FilterStore;
