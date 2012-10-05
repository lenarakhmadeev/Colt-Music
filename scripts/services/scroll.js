
define(['underscore', 'vk', 'services/mediator'], function(_, vk, mediator) {
  var scroll;
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
