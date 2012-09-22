var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'services/mediator'], function(Backbone, mediator) {
  'use strict';

  var PlayerModel;
  return PlayerModel = (function(_super) {

    __extends(PlayerModel, _super);

    function PlayerModel() {
      return PlayerModel.__super__.constructor.apply(this, arguments);
    }

    PlayerModel.prototype.initialize = function(attributes, options) {
      mediator.subscribe('player:play', this.play, this);
      mediator.subscribe('player:pause', this.pause, this);
      return mediator.subscribe('player:resume', this.resume, this);
    };

    PlayerModel.prototype.play = function(model) {
      this.set({
        current: model
      });
      return this.setPlayed(true);
    };

    PlayerModel.prototype.pause = function() {
      return this.setPlayed(false);
    };

    PlayerModel.prototype.resume = function() {
      return this.setPlayed(true);
    };

    PlayerModel.prototype.setPlayed = function(played) {
      return this.set('played', played);
    };

    return PlayerModel;

  })(Backbone.Model);
});
