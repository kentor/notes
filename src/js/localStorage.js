export default typeof localStorage !== "undefined" ? localStorage : (() => {
  var store = {};
  return {
    setItem: function() {},
    getItem: function() {},
    removeItem: function() {},
  };
})();
