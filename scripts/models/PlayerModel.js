var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Backbone, PlayerModel, mediator, player;
  Backbone = require('Backbone');
  mediator = require('services/mediator');
  player = require('services/player');
  return PlayerModel = (function(_super) {

    __extends(PlayerModel, _super);

    function PlayerModel() {
      return PlayerModel.__super__.constructor.apply(this, arguments);
    }

    PlayerModel.prototype.initialize = function(attributes, options) {
      return mediator.subscribe('player:play', this.play, this);
    };

    PlayerModel.prototype.play = function(model) {
      return this.set('current', model);
    };

    PlayerModel.prototype.pause = function() {
      return this.getCurrent().pause();
    };

    PlayerModel.prototype.resume = function() {
      var current;
      current = this.getCurrent();
      if (current != null) {
        return current.resume();
      } else {
        return mediator.publish('list:play_first');
      }
    };

    PlayerModel.prototype.getCurrent = function() {
      return this.get('current');
    };

    return PlayerModel;

  })(Backbone.Model);
});