
define(function(require) {
  var lastFmProxy, proxy, vkProxy, _;
  _ = require('_');
  lastFmProxy = require('services/proxy/lastFmProxy');
  vkProxy = require('services/proxy/vkProxy');
  return proxy = _.extend({}, lastFmProxy, vkProxy);
});
