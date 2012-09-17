var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'mediator', 'models/SimilarsCollection', 'proxy'], function(Backbone, mediator, SimilarsCollection, proxy) {
  var ItemModel;
  return ItemModel = (function(_super) {

    __extends(ItemModel, _super);

    function ItemModel() {
      return ItemModel.__super__.constructor.apply(this, arguments);
    }

    ItemModel.prototype.defaults = {
      type: 'item',
      has_info: false
    };

    ItemModel.prototype.initialize = function(attributes, options) {
      this.similarsCollection = new SimilarsCollection();
      return this.similarsCollection.setDesignation(this.get('artist'), this.get('title'));
    };

    ItemModel.prototype.getTrackInfo = function() {
      var _this = this;
      return proxy.getTrackInfo(this.get('artist'), this.get('title')).done(function(data) {
        _this.set(data);
        return _this.set('has_info', true);
      });
    };

    ItemModel.prototype.fetch = function() {
      if (!this.get('has_info')) {
        this.getTrackInfo();
      }
      return this.similarsCollection.getFirstSimilars();
    };

    ItemModel.prototype.select = function(selected) {
      return this.trigger('select', selected);
    };

    ItemModel.prototype.play = function() {
      mediator.publish('player:play', this);
      return mediator.publish('list:current', this);
    };

    return ItemModel;

  })(Backbone.Model);
});
