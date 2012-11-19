
requirejs.config({
  deps: ['main'],
  baseUrl: 'scripts',
  paths: {
    $: 'libs/jquery/jquery-1.8.0',
    _: 'libs/lodash',
    Backbone: 'libs/backbone/backbone',
    json2: 'libs/json2',
    jpath: 'libs/jpath',
    humane: 'libs/humane',
    text: 'libs/requirejs/text',
    tpl: 'libs/requirejs/tpl',
    templates: '../templates',
    vk: 'http://vk.com/js/api/xd_connection'
  },
  map: {
    '*': {
      underscore: '_',
      backbone: 'Backbone',
      jquery: '$'
    }
  },
  shim: {
    Backbone: {
      deps: ['$', '_', 'json2'],
      exports: function() {
        require(['libs/backbone/backbone-nested']);
        return this.Backbone;
      }
    },
    $: {
      exports: function() {
        require(['libs/jquery/jplayer/jquery.jplayer.min', 'libs/jquery/marquee']);
        return this.$;
      }
    },
    vk: {
      exports: 'VK'
    },
    jpath: {
      exports: 'jpath'
    }
  }
});

requirejs.onError = function(errObject) {
  var requireModules, requireType;
  requireType = errObject.requireType;
  requireModules = errObject.requireModules;
  return console.log(requireType, requireModules);
};
