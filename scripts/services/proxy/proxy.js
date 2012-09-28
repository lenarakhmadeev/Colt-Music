
define(['underscore', 'services/proxy/lastFmProxy', 'services/proxy/vkProxy'], function(_, lastFmProxy, vkProxy) {
  'use strict';

  var proxy;
  return proxy = _.extend({}, lastFmProxy, vkProxy);
});
