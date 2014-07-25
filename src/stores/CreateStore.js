/**
 * Module dependencies
 */
var Store = require('./Store')
  , util = require("util");

/**
 * CreateStore
 */
var CreateStore = function(spec) {
  var constructor = function(options) {
    options = options || {};
    Store.call(this);

    for (var key in spec) {
      if (key === "actions") {
        this.__actions__ = spec[key];
      } else if (key === "initialize") {
        // do nothing
      } else if (typeof spec[key] === "function") {
        this[key] = spec[key].bind(this);
      } else {
        this[key] = spec[key];
      }
    }

    if (spec.initialize) {
      spec.initialize.call(this, options);
    }
  };

  util.inherits(constructor, Store);
  return constructor;
};

module.exports = CreateStore;
