export default typeof localStorage !== "undefined" ? localStorage : (() => {
  return {
    setItem: function() {},
    getItem: function() {},
    removeItem: function() {},
  };
})();
