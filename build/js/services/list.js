
define(['services/mediator'], function(mediator) {
  var list;
  return list = {
    init: function() {
      mediator.subscribe('list:next', this.next, this);
      mediator.subscribe('list:prev', this.prev, this);
      return mediator.subscribe('list:current', this.current, this);
    },
    next: function() {
      var next, nextId;
      console.log('next');
      nextId = this.currentTrack.id + 1;
      next = this.currentTrack.collection.get(nextId);
      mediator.publish('player:play', next);
      return this.current(next);
    },
    nextItem: function() {},
    nextSim: function() {},
    prev: function() {
      return console.log('prev');
    },
    current: function(model) {
      if (this.currentTrack != null) {
        this.currentTrack.select(false);
      }
      this.currentTrack = model;
      return this.currentTrack.select(true);
    }
  };
});
