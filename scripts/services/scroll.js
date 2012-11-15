
define(function(require) {
  var mediator, scroll, vk, _;
  _ = require('_');
  vk = require('vk');
  mediator = require('services/mediator');
  return scroll = {
    init: function() {
      vk.callMethod('scrollSubscribe', {
        fireEvent: true
      });
      return vk.addCallback('onScroll', _.bind(this._onScroll, this));
    },
    _onScroll: function(scrollTop, windowHeight) {
      return mediator.publish('scroll', scrollTop);
    }
  };
});
