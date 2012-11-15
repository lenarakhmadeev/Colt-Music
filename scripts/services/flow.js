
define(function(require) {
  var flow, mediator, _;
  mediator = require('services/mediator');
  _ = require('_');
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
      if (track.get('type') === 'item') {
        return this.nextForItem(track);
      } else {
        return this.nextForSim(track);
      }
    },
    nextForItem: function(track) {
      if (track.similarsCollection.length) {
        return track.similarsCollection.at(0);
      } else {
        return this.nextInCollection(track);
      }
    },
    nextForSim: function(track) {
      var parentItem;
      parentItem = track.collection.parent;
      if (this.isLast(track)) {
        if (this.isLast(parentItem)) {
          return;
        }
        return this.nextInCollection(parentItem);
      } else {
        return this.nextInCollection(track);
      }
    },
    nextInCollection: function(track) {
      var id;
      id = track.id + 1;
      return track.collection.get(id);
    },
    prev: function() {
      var prev;
      prev = this._prev(this.currentTrack);
      if (prev != null) {
        return prev.play();
      }
    },
    _prev: function(track) {
      if (track.get('type') === 'item') {
        return this.prevForItem(track);
      } else {
        return this.prevForSim(track);
      }
    },
    prevForItem: function(track) {
      var prevItem;
      if (this.isFirst(track)) {
        return;
      }
      prevItem = this.prevInCollection(track);
      if (prevItem.similarsCollection.length) {
        return prevItem.similarsCollection.last();
      } else {
        return prevItem;
      }
    },
    prevForSim: function(track) {
      if (this.isFirst(track)) {
        return track.collection.parent;
      } else {
        return this.prevInCollection(track);
      }
    },
    prevInCollection: function(track) {
      var id;
      id = track.id - 1;
      return track.collection.get(id);
    },
    isLast: function(track) {
      return track === track.collection.last();
    },
    isFirst: function(track) {
      return track === track.collection.first();
    },
    loadTrackPage: function(track) {
      if (track.get('type') === 'similar') {
        track = track.collection.parent;
      }
      return mediator.publish('list:load_page', this.getItemPage(track));
    },
    getItemPage: function(item) {
      var indx, pageSize;
      pageSize = item.collection.pageSize;
      indx = item.id;
      return Math.floor(indx / pageSize);
    },
    setCurrent: function(track) {
      if (this.currentTrack != null) {
        this.currentTrack.setCurrent(false);
      }
      this.currentTrack = track;
      this.loadTrackPage(track);
      return this.preloadNextSimilar(track);
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
