var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'mediator', 'models/ListCollection'], function(Backbone, mediator, ListCollection) {
  var ListModel;
  return ListModel = (function(_super) {

    __extends(ListModel, _super);

    function ListModel() {
      return ListModel.__super__.constructor.apply(this, arguments);
    }

    ListModel.prototype.defaults = {
      page: 0,
      loaded: false
    };

    ListModel.prototype.pageSize = 5;

    ListModel.prototype.initialize = function(attributes, options) {
      this.listCollection = new ListCollection();
      this.listCollection.bind('reset', this.collectionReset, this);
      return mediator.subscribe('load:page', this.loadPage, this);
    };

    ListModel.prototype.getAudio = function() {
      return this.listCollection.getAudio();
    };

    ListModel.prototype.collectionReset = function() {
      this.set('loaded', true);
      return this.loadPage(this.get('page'));
    };

    ListModel.prototype.loadPage = function(page) {
      this.set('page', page);
      if (this.get('loaded')) {
        return this.set('content', this.getPage(page));
      }
    };

    ListModel.prototype.getPage = function(page) {
      var end, start;
      start = page * this.pageSize;
      end = (page + 1) * this.pageSize;
      return this.listCollection.slice(start, end);
    };

    ListModel.prototype.pagesCount = function() {
      return Math.ceil(this.listCollection.length / this.pageSize);
    };

    return ListModel;

  })(Backbone.Model);
});
