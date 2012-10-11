'use strict';

require.config({
  deps: ['main'],
  baseUrl: 'scripts',
  paths: {
    jquery: 'libs/jquery/jquery-1.8.0',
    underscore: 'libs/lodash',
    backbone: 'libs/backbone/backbone',
    json2: 'libs/json2',
    jpath: 'libs/jpath',
    humane: 'libs/humane',
    jquery_jplayer: 'libs/jquery/jplayer/jquery.jplayer.min',
    jquery_marquee: 'libs/jquery/marquee',
    backbone_nested: 'libs/backbone/backbone-nested',
    text: 'libs/requirejs/text',
    tpl: 'libs/requirejs/tpl',
    templates: '../templates',
    vk: 'http://vk.com/js/api/xd_connection'
  },
  shim: {
    backbone_nested: {
      deps: ['backbone']
    },
    backbone: {
      deps: ['jquery', 'underscore', 'json2'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    vk: {
      exports: 'VK'
    },
    jquery_jplayer: {
      deps: ['jquery']
    },
    jquery_marquee: {
      deps: ['jquery']
    },
    jpath: {
      exports: 'jpath'
    }
  },
  config: {
    'services/proxy/lastFmProxy': {
      lastFm_key: '6e827e122dacfa2346e88ef5a964b196',
      lastFm_url: 'http://ws.audioscrobbler.com/2.0/'
    },
    'services/player': {
      swf_path: 'scripts/libs/jquery/jplayer'
    }
  }
});
