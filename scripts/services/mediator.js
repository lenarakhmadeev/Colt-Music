
define(function(require) {
  var Backbone, mediator;
  Backbone = require('backbone');
  'use strict';

  return mediator = {
    subscribe: Backbone.Events.on,
    unsubscribe: Backbone.Events.off,
    publish: Backbone.Events.trigger
  };
});
