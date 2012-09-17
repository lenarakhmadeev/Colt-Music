
define(['backbone'], function(Backbone) {
  var mediator;
  return mediator = {
    subscribe: Backbone.Events.on,
    unsubscribe: Backbone.Events.off,
    publish: Backbone.Events.trigger
  };
});
