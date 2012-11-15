
define(function(require) {
  var Backbone, mediator;
  Backbone = require('Backbone');
  return mediator = {
    subscribe: Backbone.Events.on,
    unsubscribe: Backbone.Events.off,
    publish: Backbone.Events.trigger
  };
});
