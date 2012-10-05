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

    PlayerView.prototype.className = 'b-player';

    PlayerView.prototype.events = {
      'click .b-player__play-button': 'resume',
      'click .b-player__pause-button': 'pause',
      'click .b-player__prev-button': 'prev',
      'click .b-player__next-button': 'next',
      'click .b-player__add-button': 'addAudio'
    };

    PlayerView.prototype.initialize = function(options) {
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
      return this.append('.b-player__marquee-place', this.marqueeView);
    };

    PlayerView.prototype.renderPlayed = function() {
      var played;
      played = this.model.getCurrent().get('played');
      if (played) {
        this.$('.b-player__play-button').hide();
        return this.$('.b-player__pause-button').show();
      } else {
        this.$('.b-player__play-button').show();
        return this.$('.b-player__pause-button').hide();
      }
    };

    PlayerView.prototype.renderCurrent = function() {
      this.subscribePlayed();
      this.renderType();
      this.renderCover();
      return this.renderPlayed();
    };

    PlayerView.prototype.subscribePlayed = function() {
      var current;
      current = this.model.getCurrent();
      this.model.off('change:played', null, this);
      return current.on('change:played', this.renderPlayed, this);
    };

    PlayerView.prototype.renderType = function() {
      var type;
      type = this.model.getCurrent().get('type');
      if (type === 'similar') {
        return this.$('.b-player__add-button').show(500);
      } else {
        return this.$('.b-player__add-button').hide(500);
      }
    };

    PlayerView.prototype.renderCover = function() {
      var cover;
      cover = this.model.getCurrent().get('info.images.126') || 'images/big.png';
      return this.$('.b-player__cover-image').attr('src', cover);
    };

    PlayerView.prototype.resume = function() {
      return this.model.resume();
    };

    PlayerView.prototype.pause = function() {
      return this.model.pause();
    };

    PlayerView.prototype.prev = function() {
      return mediator.publish('flow:prev');
    };

    PlayerView.prototype.next = function() {
      return mediator.publish('flow:next');
    };

    PlayerView.prototype.addAudio = function() {
      var track;
      track = this.model.getCurrent();
      return track.addToAudio();
    };

    return PlayerView;

  })(View);
});
