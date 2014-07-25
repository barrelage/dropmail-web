/** @jsx React.DOM **/

var ParseRefsMixin = {
  parseRefs: function() {
    var self = this
      , refs = {};

    Object.keys(this.refs).forEach(function(key) {
      refs[key] = self.refs[key].getDOMNode().value;
    });

    return refs;
  }
};

module.exports = ParseRefsMixin;
