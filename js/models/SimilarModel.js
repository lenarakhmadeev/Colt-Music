var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'backbone', 'services/mediator', 'models/SimilarsCollection', 'services/proxy/proxy', 'backbone_nested'], function($, Backbone, mediator, SimilarsCollection, proxy) {
  'use strict';

  var SimilarModel;
  return SimilarModel = (function(_super) {

    __extends(SimilarModel, _super);

    function SimilarModel() {
      this._addToWall = __bind(this._addToWall, this);

      this._addToAudio = __bind(this._addToAudio, this);

      this._play = __bind(this._play, this);
      return SimilarModel.__super__.constructor.apply(this, arguments);
    }

    SimilarModel.prototype.defaults = {
      artist: null,
      title: null,
      selected: false,
      type: 'similar',
      has_info: false,
      has_audio: false,
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

    SimilarModel.prototype.getTrackInfo = function() {
      if (!this.get('has_info')) {
        return this._getTrackInfo();
      }
    };

    SimilarModel.prototype._getTrackInfo = function() {
      var _this = this;
      return proxy.getTrackInfo(this.get('artist'), this.get('title')).done(function(data) {
        return _this.set({
          info: data
        });
      }).always(function() {
        return _this.set('has_info', true);
      });
    };

    SimilarModel.prototype.getAudioUrl = function() {
      var dfd,
        _this = this;
      dfd = new $.Deferred();
      if (this.get('has_audio')) {
        dfd.resolve();
      } else {
        this._getAudioUrl().done(function() {
          return dfd.resolve();
        }).always(function() {
          return _this.set('has_audio', true);
        });
      }
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
      return this.getAudioUrl().done(this._play);
    };

    SimilarModel.prototype._play = function() {
      mediator.publish('player:play', this);
      return mediator.publish('list:current', this);
    };

    SimilarModel.prototype.addToAudio = function() {
      return this.getAudioUrl().done(this._addToAudio);
    };

    SimilarModel.prototype._addToAudio = function() {
      return proxy.addToAudio(this.get('audio.audio_id'), this.get('audio.owner_id'));
    };

    SimilarModel.prototype.addToWall = function() {
      return this.getAudioUrl().done(this._addToWall);
    };

    SimilarModel.prototype._addToWall = function() {
      return proxy.addToWall(this.get('audio.audio_id'), this.get('audio.owner_id'));
    };

    return SimilarModel;

  })(Backbone.NestedModel);
});
