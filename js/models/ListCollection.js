var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'models/Collection', 'models/ItemModel', 'services/mediator', 'services/proxy/proxy'], function(_, Collection, ItemModel, mediator, proxy) {
  'use strict';

  var ListCollection;
  return ListCollection = (function(_super) {

    __extends(ListCollection, _super);

    function ListCollection() {
      return ListCollection.__super__.constructor.apply(this, arguments);
    }

    ListCollection.prototype.model = ItemModel;

    ListCollection.prototype.initialize = function(models, options) {
      this.own.set({
        page: 0
      });
      this.bind('reset', this.firstLoad, this);
      return mediator.subscribe('load:page', this.loadPage, this);
    };

    ListCollection.prototype.getAudio = function() {
      var _this = this;
      return proxy.getAudioList().done(function(data) {
        return _this.reset(data);
      });
    };

    ListCollection.prototype.firstLoad = function() {
      this.loadPage(this.own.get('page'));
      return this.playFirst();
    };

    ListCollection.prototype.playFirst = function() {
      var firstPlay;
      firstPlay = this.getFirstPlay();
      mediator.publish('list:current', firstPlay);
      mediator.publish('player:play', firstPlay);
      return mediator.publish('player:pause');
    };

    ListCollection.prototype.getFirstPlay = function() {
      return this.own.get('content')[0];
    };

    ListCollection.prototype.loadPage = function(page) {
      this.preloadPage(page);
      this._loadPage(page);
      return this.preloadPage(page + 1);
    };

    ListCollection.prototype._loadPage = function(page) {
      this.own.set('page', page);
      return this.own.set('content', this.getPage(page));
    };

    ListCollection.prototype.preloadPage = function(page) {
      var content;
      content = this.getPage(page);
      return this.fetchContent(content);
    };

    ListCollection.prototype.fetchContent = function(content) {
      return _.each(content, this.fetchItem, this);
    };

    ListCollection.prototype.fetchItem = function(item) {
      return item.fetch();
    };

    ListCollection.prototype.pageSize = 5;

    ListCollection.prototype.getPage = function(page) {
      var end, start;
      start = page * this.pageSize;
      end = (page + 1) * this.pageSize;
      return this.slice(start, end);
    };

    ListCollection.prototype.pagesCount = function() {
      return Math.ceil(this.length / this.pageSize);
    };

    ListCollection.prototype.nextPage = function() {
      return this.loadPage(this.own.get('page') + 1);
    };

    ListCollection.prototype.prevPage = function() {
      return this.loadPage(this.own.get('page') - 1);
    };

    return ListCollection;

  })(Collection);
});
