
define(['backbone'], function(Backbone) {
  'use strict';

  var mediator;
  return mediator = {
    subscribe: Backbone.Events.on,
    unsubscribe: Backbone.Events.off,
    publish: Backbone.Events.trigger
  };
});
