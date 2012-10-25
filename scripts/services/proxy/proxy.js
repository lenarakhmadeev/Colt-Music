
define(function(require) {
  var lastFmProxy, proxy, vkProxy, _;
  _ = require('underscore');
  lastFmProxy = require('services/proxy/lastFmProxy');
  vkProxy = require('services/proxy/vkProxy');
  'use strict';

  return proxy = _.extend({}, lastFmProxy, vkProxy);
});
