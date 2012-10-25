var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var $, Backbone, TrackModel, mediator, proxy;
  $ = require('jquery');
  Backbone = require('backbone');
  mediator = require('services/mediator');
  proxy = require('services/proxy/proxy');
  require('backbone_nested');
  'use strict';

  return TrackModel = (function(_super) {

    __extends(TrackModel, _super);

    function TrackModel() {
      this._addToAudio = __bind(this._addToAudio, this);

      this._addToWall = __bind(this._addToWall, this);

      this._play = __bind(this._play, this);
      return TrackModel.__super__.constructor.apply(this, arguments);
    }

    TrackModel.prototype.defaults = {
      artist: null,
      title: null,
      selected: false,
      played: false,
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

    TrackModel.prototype.getTrackInfo = function() {
      if (!this.get('has_info')) {
        return this._getTrackInfo();
      }
    };

    TrackModel.prototype._getTrackInfo = function() {
      var _this = this;
      return proxy.getTrackInfo(this.get('artist'), this.get('title')).done(function(data) {
        return _this.set({
          info: data
        });
      }).fail(function(error) {
        return mediator.publish('logger:error', "getTrackInfo fail: " + error.error_msg);
      }).always(function() {
        return _this.set('has_info', true);
      });
    };

    TrackModel.prototype.getAudioUrl = function() {
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

    TrackModel.prototype._getAudioUrl = function() {
      var _this = this;
      return proxy.getAudioUrl(this.get('artist'), this.get('title')).done(function(data) {
        return _this.set({
          audio: data
        });
      }).fail(function(error) {
        mediator.publish('logger:user:error', 'Запись не найдена');
        return mediator.publish('logger:error', "getAudioUrl fail: " + error.error_msg);
      });
    };

    TrackModel.prototype.setCurrent = function(current) {
      this.setSelected(current);
      return this.setPlayed(current);
    };

    TrackModel.prototype.setSelected = function(selected) {
      return this.set('selected', selected);
    };

    TrackModel.prototype.setPlayed = function(played) {
      return this.set('played', played);
    };

    TrackModel.prototype.play = function() {
      if (this.get('selected')) {
        return this.resume();
      } else {
        return this.getAudioUrl().done(this._play);
      }
    };

    TrackModel.prototype._play = function() {
      this.setCurrent(true);
      mediator.publish('player:play', this);
      return mediator.publish('flow:current', this);
    };

    TrackModel.prototype.pause = function() {
      this.setPlayed(false);
      return mediator.publish('player:pause');
    };

    TrackModel.prototype.resume = function() {
      this.setPlayed(true);
      return mediator.publish('player:resume');
    };

    TrackModel.prototype.togglePlay = function() {
      if (this.get('played')) {
        return this.pause();
      } else {
        if (this.get('selected')) {
          return this.resume();
        } else {
          return this.play();
        }
      }
    };

    TrackModel.prototype.addToWall = function() {
      return this.getAudioUrl().done(this._addToWall);
    };

    TrackModel.prototype._addToWall = function() {
      return proxy.addToWall(this.get('audio.audio_id'), this.get('audio.owner_id')).done(function() {
        return mediator.publish('logger:user:success', 'Запись размещена на стене');
      }).fail(function(error) {
        var errorMessage;
        errorMessage = error.error_msg;
        mediator.publish('logger:user:error', 'Запись не может быть размещена на стене: ' + errorMessage);
        return mediator.publish('logger:error', "addToWall fail: " + errorMessage);
      });
    };

    TrackModel.prototype.addToAudio = function() {
      return this.getAudioUrl().done(this._addToAudio);
    };

    TrackModel.prototype._addToAudio = function() {
      var _this = this;
      return proxy.addToAudio(this.get('audio.audio_id'), this.get('audio.owner_id')).done(function(audio_id) {
        return mediator.publish('logger:user:success', 'Запись успешно добавлена');
      }).fail(function(error) {
        var errorMessage;
        errorMessage = error.error_msg;
        mediator.publish('logger:user:error', 'Запись не может быть добавлена: ' + errorMessage);
        return mediator.publish('logger:error', "addToAudio fail: " + errorMessage);
      });
    };

    return TrackModel;

  })(Backbone.NestedModel);
});
