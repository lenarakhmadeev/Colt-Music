var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Backbone, ItemModel, SimilarsCollection, TrackModel, mediator, proxy;
  Backbone = require('backbone');
  TrackModel = require('models/TrackModel');
  mediator = require('services/mediator');
  SimilarsCollection = require('collections/SimilarsCollection');
  proxy = require('services/proxy/proxy');
  require('backbone_nested');
  'use strict';

  return ItemModel = (function(_super) {

    __extends(ItemModel, _super);

    function ItemModel() {
      return ItemModel.__super__.constructor.apply(this, arguments);
    }

    ItemModel.prototype.defaults = {
      artist: null,
      title: null,
      selected: false,
      played: false,
      type: 'item',
      has_info: false,
      has_audio: true,
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

    ItemModel.prototype.fetch = function() {
      if (!this.get('has_info')) {
        this.getTrackInfo();
      }
      return this.similarsCollection.getFirstSimilars();
    };

    return ItemModel;

  })(TrackModel);
});
