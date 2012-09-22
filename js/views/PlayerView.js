var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'services/mediator', 'views/MarqueeView', 'tpl!templates/player.html'], function(View, mediator, MarqueeView, playerTemplate) {
  'use strict';

  var PlayerView;
  return PlayerView = (function(_super) {

    __extends(PlayerView, _super);

    function PlayerView() {
      return PlayerView.__super__.constructor.apply(this, arguments);
    }

    PlayerView.prototype.template = playerTemplate;

    PlayerView.prototype.className = 'player';

    PlayerView.prototype.events = {
      'click .play': 'play',
      'click .pause': 'pause',
      'click .rew': 'prev',
      'click .ff': 'next',
      'click .PlayerAddButton': 'addAudio'
    };

    PlayerView.prototype.initialize = function(options) {
      this.model.on('change:played', this.renderPlayed, this);
      this.model.on('change:current', this.renderCurrent, this);
      return this.marqueeView = new MarqueeView({
        model: this.model
      });
    };

    PlayerView.prototype._render = function() {
      return this.renderMarquee();
    };

    PlayerView.prototype.renderMarquee = function() {
      this.marqueeView.render();
      return this.append('.trackinfo', this.marqueeView);
    };

    PlayerView.prototype.renderPlayed = function() {
      if (this.model.get('played')) {
        this.$('.play').fadeOut('slow');
        return this.$('.pause').fadeIn('slow');
      } else {
        this.$('.play').fadeIn('slow');
        return this.$('.pause').fadeOut('slow');
      }
    };

    PlayerView.prototype.renderCurrent = function() {
      var cover, current;
      current = this.model.get('current');
      this.renderType(current.get('type'));
      cover = current.get('info.images.large') || 'images/big.png';
      return this.renderCover(cover);
    };

    PlayerView.prototype.renderType = function(type) {
      if (type === 'item') {
        return this.$('.PlayerAddButton').show(500);
      } else {
        return this.$('.PlayerAddButton').hide(500);
      }
    };

    PlayerView.prototype.renderCover = function(cover) {
      return this.$('.PlayerBigImage').attr('src', cover);
    };

    PlayerView.prototype.play = function() {
      return mediator.publish('player:resume');
    };

    PlayerView.prototype.pause = function() {
      return mediator.publish('player:pause');
    };

    PlayerView.prototype.prev = function() {
      return mediator.publish('list:prev');
    };

    PlayerView.prototype.next = function() {
      return mediator.publish('list:next');
    };

    PlayerView.prototype.addAudio = function() {};

    return PlayerView;

  })(View);
});