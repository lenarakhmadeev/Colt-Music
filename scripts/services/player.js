
define(['jquery', 'module', 'services/mediator', 'jquery_jplayer'], function($, module, mediator) {
  'use strict';

  var player;
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
        cssSelectorAncestor: '.player',
        cssSelector: {
          volumeBarValue: '.PlayerVolBar',
          volumeBar: '.PlayerVolBack',
          mute: '.MutePre',
          unmute: '.MuteAft',
          seekBar: '.PlayerLoadProgress',
          playBar: '.PlayerPlayProgress'
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
