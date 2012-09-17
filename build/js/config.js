
require.config({
  deps: ['app'],
  baseUrl: 'js',
  paths: {
    jquery: 'libs/jquery/jquery-1.8.0',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    json2: 'libs/json2',
    jquery_jplayer: 'libs/jquery/jplayer/jquery.jplayer.min',
    jquery_jscroller: 'libs/jquery/jquery-scroller-v1.src',
    text: 'libs/requirejs/text',
    tpl: 'libs/requirejs/tpl',
    templates: '../templates',
    vk: 'http://vk.com/js/api/xd_connection'
  },
  shim: {
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
    jquery_jscroller: {
      deps: ['jquery']
    }
  },
  config: {
    'services/proxy/proxy': {
      'lastFm_key': 'b25b959554ed76058ac220b7b2e0a026',
      'lastFm_url': 'http://ws.audioscrobbler.com/2.0/'
    }
  }
});
