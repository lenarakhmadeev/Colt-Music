var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'collections/Collection', 'models/ItemModel', 'services/mediator', 'services/proxy/proxy'], function(_, Collection, ItemModel, mediator, proxy) {
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
      mediator.subscribe('list:load_page', this.loadPage, this);
      return mediator.subscribe('list:play_first', this.playFirst, this);
    };

    ListCollection.prototype.getAudio = function() {
      var _this = this;
      return proxy.getAudioList().done(function(data) {
        return _this.reset(data);
      });
    };

    ListCollection.prototype.firstLoad = function() {
      return this.loadPage(this.own.get('page'));
    };

    ListCollection.prototype.playFirst = function() {
      return this.getFirstTrack().play();
    };

    ListCollection.prototype.getFirstTrack = function() {
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
