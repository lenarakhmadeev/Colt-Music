
define(['services/mediator'], function(mediator) {
  'use strict';

  var list;
  return list = {
    init: function() {
      mediator.subscribe('list:next', this.next, this);
      mediator.subscribe('list:prev', this.prev, this);
      return mediator.subscribe('list:current', this.setCurrent, this);
    },
    next: function() {
      var next;
      console.log('next');
      if (this.currentTrack.get('type') === 'item') {
        next = this.nextForItem();
      } else {
        next = this.nextForSim();
      }
      return next.play();
    },
    nextForItem: function() {
      var next;
      if (this.currentTrack.similarsCollection.length) {
        next = this.currentTrack.similarsCollection.at(0);
      } else {
        next = this.nextInCollection(this.currentTrack);
        this.checkLast(this.currentTrack);
      }
      return next;
    },
    nextForSim: function() {
      var next;
      if (this.currentTrack === this.currentTrack.collection.last()) {
        next = this.nextInCollection(this.currentTrack.collection.parent);
        this.checkLast(this.currentTrack.collection.parent);
      } else {
        next = this.nextInCollection(this.currentTrack);
      }
      return next;
    },
    nextInCollection: function(track) {
      var id;
      id = track.id + 1;
      return track.collection.get(id);
    },
    checkLast: function(track) {
      if (track.collection.isLastInPage(track)) {
        return track.collection.nextPage();
      }
    },
    prev: function() {
      var prev;
      console.log('prev');
      prev = this.currentTrack.get('type') === 'item' ? this.prevForItem() : this.prevForSim();
      return prev.play();
    },
    prevForItem: function() {
      var prevItem;
      prevItem = this.prevInCollection(this.currentTrack);
      if (prevItem.similarsCollection.length) {
        return prevItem.similarsCollection.last();
      } else {
        return prevItem;
      }
    },
    prevForSim: function() {
      if (this.currentTrack === this.currentTrack.collection.first()) {
        return this.currentTrack.collection.parent;
      } else {
        return this.prevInCollection(this.currentTrack);
      }
    },
    prevInCollection: function(track) {
      var id;
      id = track.id - 1;
      return track.collection.get(id);
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
