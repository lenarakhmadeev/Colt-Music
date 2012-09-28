
define(['services/mediator'], function(mediator) {
  'use strict';

  var flow;
  return flow = {
    init: function() {
      mediator.subscribe('flow:next', this.next, this);
      mediator.subscribe('flow:prev', this.prev, this);
      return mediator.subscribe('flow:current', this.setCurrent, this);
    },
    next: function() {
      var next;
      next = this._next(this.currentTrack);
      if (next != null) {
        return next.play();
      }
    },
    _next: function(track) {
      var next;
      if (track.get('type') === 'item') {
        next = this.nextForItem();
      } else {
        if (track === track.collection.last() && track.collection.parent === track.collection.parent.collection.last()) {
          return;
        }
        next = this.nextForSim();
      }
      return next;
    },
    nextForItem: function() {
      var next;
      if (this.currentTrack.similarsCollection.length) {
        next = this.currentTrack.similarsCollection.at(0);
      } else {
        next = this.nextInCollection(this.currentTrack);
        this.checkLastInPage(this.currentTrack);
      }
      return next;
    },
    nextForSim: function() {
      var next;
      if (this.currentTrack === this.currentTrack.collection.last()) {
        next = this.nextInCollection(this.currentTrack.collection.parent);
        this.checkLastInPage(this.currentTrack.collection.parent);
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
    checkLastInPage: function(track) {
      if (_.last(track.collection.own.get('content')) === track) {
        return track.collection.nextPage();
      }
    },
    prev: function() {
      var prev;
      prev = this._prev(this.currentTrack);
      if (prev != null) {
        return prev.play();
      }
    },
    _prev: function(track) {
      var prev;
      if (track.get('type') === 'item') {
        if (track === track.collection.first()) {
          return;
        }
        prev = this.prevForItem();
      } else {
        prev = this.prevForSim();
      }
      return prev;
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
        this.currentTrack.setCurrent(false);
      }
      return this.currentTrack = track;
    },
    preloadNextSimilar: function(track) {
      var nextNext;
      nextNext = this._next(track);
      if ((nextNext != null) && nextNext.get('type') === 'similar') {
        return nextNext.getAudioUrl();
      }
    }
  };
});
