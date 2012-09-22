var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'backbone', 'services/mediator', 'models/SimilarsCollection', 'services/proxy/proxy', 'backbone_nested'], function($, Backbone, mediator, SimilarsCollection, proxy) {
  'use strict';

  var SimilarModel;
  return SimilarModel = (function(_super) {

    __extends(SimilarModel, _super);

    function SimilarModel() {
      return SimilarModel.__super__.constructor.apply(this, arguments);
    }

    SimilarModel.prototype.defaults = {
      artist: null,
      title: null,
      selected: false,
      type: 'similar',
      has_info: false,
      info: {
        wiki: null,
        album: null,
        images: null,
        tags: null
      },
      audio: {
        url: null,
        aid: null,
        owner_id: null,
        duration: null
      }
    };

    SimilarModel.prototype.getTrackInfo = function() {
      if (!this.has('info')) {
        return this._getTrackInfo();
      }
    };

    SimilarModel.prototype._getTrackInfo = function() {
      var _this = this;
      return proxy.getTrackInfo(this.get('artist'), this.get('title')).done(function(data) {
        return _this.set({
          info: data
        });
      });
    };

    SimilarModel.prototype.getAudioUrl = function() {
      var dfd;
      dfd = new $.Deferred();
      if (this.has('audio')) {
        dfd.resolve();
      }
      this._getAudioUrl().done(function() {
        return dfd.resolve();
      });
      return dfd.promise();
    };

    SimilarModel.prototype._getAudioUrl = function() {
      var _this = this;
      return proxy.getAudioUrl(this.get('artist'), this.get('title')).done(function(data) {
        return _this.set({
          audio: data
        });
      });
    };

    SimilarModel.prototype.select = function(selected) {
      return this.set('selected', selected);
    };

    SimilarModel.prototype.play = function() {
      var _this = this;
      return this.getAudioUrl().done(function() {
        mediator.publish('player:play', _this);
        return mediator.publish('list:current', _this);
      });
    };

    return SimilarModel;

  })(Backbone.NestedModel);
});
