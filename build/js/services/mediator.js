
define(['backbone'], function(Backbone) {
  /*
  		Коммуникация между модулями посредствам вызовов и прослушивания событий
  */

  var mediator;
  return mediator = {
    subscribe: Backbone.Events.on,
    unsubscribe: Backbone.Events.off,
    publish: Backbone.Events.trigger
  };
});
