
define(function(require) {
  var mediator, scroll, vk, _;
  _ = require('underscore');
  vk = require('vk');
  mediator = require('services/mediator');
  'use strict';

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
