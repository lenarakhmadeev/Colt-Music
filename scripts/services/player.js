
define(function(require, exports, module) {
  var $, mediator, player;
  $ = require('jquery');
  mediator = require('services/mediator');
  require('jquery_jplayer');
  'use strict';

  return player = {
    init: function() {
      return this.initJPlayer();
    },
    initJPlayer: function() {
      var _this = this;
      this.jp = $('#jp');
      return this.jp.jPlayer({
        ready: function() {
          return _this.initEvents();
        },
        swfPath: module.config().swf_path,
        wmode: 'window',
        volume: 1,
        solution: 'flash,html',
        ended: function() {
          return mediator.publish('flow:next');
        },
        cssSelectorAncestor: '.b-player',
        cssSelector: {
          volumeBarValue: '.b-player__volume-bar',
          volumeBar: '.b-player__volume',
          mute: '.b-player__mute-button',
          unmute: '.b-player__unmute-button',
          seekBar: '.b-player__load-bar',
          playBar: '.b-player__progress-bar'
        }
      });
    },
    initEvents: function() {
      mediator.subscribe('player:play', this.play, this);
      mediator.subscribe('player:pause', this.pause, this);
      return mediator.subscribe('player:resume', this.resume, this);
    },
    play: function(model) {
      this.jp.jPlayer('setMedia', {
        mp3: model.get('audio.url')
      });
      return this.jp.jPlayer('play');
    },
    pause: function() {
      return this.jp.jPlayer('pause');
    },
    resume: function() {
      return this.jp.jPlayer('play');
    },
    togglePlay: function() {
      var event;
      event = this.paused ? 'player:resume' : 'player:pause';
      return mediator.publish(event);
    }
  };
});
