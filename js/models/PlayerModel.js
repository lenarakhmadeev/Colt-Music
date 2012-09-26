var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'services/mediator', 'services/player'], function(Backbone, mediator, player) {
  'use strict';

  var PlayerModel;
  return PlayerModel = (function(_super) {

    __extends(PlayerModel, _super);

    function PlayerModel() {
      return PlayerModel.__super__.constructor.apply(this, arguments);
    }

    PlayerModel.prototype.initialize = function(attributes, options) {
      return mediator.subscribe('player:play', this.play, this);
    };

    PlayerModel.prototype.play = function(model) {
      console.log('play', model);
      return this.set('current', model);
    };

    PlayerModel.prototype.pause = function() {
      return this.getCurrent().pause();
    };

    PlayerModel.prototype.resume = function() {
      return this.getCurrent().resume();
    };

    PlayerModel.prototype.getCurrent = function() {
      return this.get('current');
    };

    return PlayerModel;

  })(Backbone.Model);
});
