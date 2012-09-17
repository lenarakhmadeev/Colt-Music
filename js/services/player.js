
define(['jquery', 'mediator', 'jquery_jplayer'], function($, mediator) {
  var player;
  return player = {
    init: function() {
      this.initJPlayer();
      return this.initEvents();
    },
    initJPlayer: function() {
      var _this = this;
      this.jp = $('#jp');
      return this.jp.jPlayer({
        ready: function() {
          return console.log('ready');
        },
        swfPath: 'js/libs/jquery/jplayer',
        wmode: 'window',
        volume: 1,
        solution: 'flash,html',
        ended: function() {
          return mediator.publish('list:next');
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
      console.log('play', model);
      this.jp.jPlayer('setMedia', {
        mp3: model.get('url') || model.get('audio').url
      });
      return this.jp.jPlayer('play');
    },
    pause: function() {
      return this.jp.jPlayer('pause');
    },
    resume: function() {
      return this.jp.jPlayer('play');
    }
  };
});
