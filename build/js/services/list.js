
define(['services/mediator'], function(mediator) {
  /*
  		Логика перехода к следующей/предыдущей записи в списке
  */

  var list;
  return list = {
    init: function() {
      mediator.subscribe('list:next', this.next, this);
      mediator.subscribe('list:prev', this.prev, this);
      return mediator.subscribe('list:current', this.setCurrent, this);
    },
    next: function() {
      return console.log('next');
    },
    prev: function() {
      return console.log('prev');
    },
    setCurrent: function(track) {
      if (this.currentTrack != null) {
        this.currentTrack.select(false);
      }
      this.currentTrack = track;
      return this.currentTrack.select(true);
    }
  };
});
