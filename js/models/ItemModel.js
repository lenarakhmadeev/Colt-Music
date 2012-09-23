var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'services/mediator', 'models/SimilarsCollection', 'services/proxy/proxy', 'backbone_nested'], function(Backbone, mediator, SimilarsCollection, proxy) {
  'use strict';

  var ItemModel;
  return ItemModel = (function(_super) {

    __extends(ItemModel, _super);

    function ItemModel() {
      return ItemModel.__super__.constructor.apply(this, arguments);
    }

    ItemModel.prototype.defaults = {
      artist: null,
      title: null,
      selected: false,
      type: 'item',
      has_info: false,
      info: {
        wiki: null,
        album: null,
        images: null,
        tags: null
      },
      audio: {
        url: null,
        audio_id: null,
        owner_id: null,
        duration: null
      }
    };

    ItemModel.prototype.initialize = function(attributes, options) {
      this.similarsCollection = new SimilarsCollection();
      return this.similarsCollection.setParent(this);
    };

    ItemModel.prototype.getTrackInfo = function() {
      var _this = this;
      return proxy.getTrackInfo(this.get('artist'), this.get('title')).done(function(data) {
        _this.set({
          info: data
        });
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
      return this.set('selected', selected);
    };

    ItemModel.prototype.play = function() {
      mediator.publish('player:play', this);
      return mediator.publish('list:current', this);
    };

    ItemModel.prototype.addToWall = function() {
      return proxy.addToWall(this.get('audio.audio_id'), this.get('audio.owner_id'));
    };

    return ItemModel;

  })(Backbone.NestedModel);
});
