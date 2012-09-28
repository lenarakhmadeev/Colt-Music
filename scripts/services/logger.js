
define(['services/mediator'], function(mediator) {
  'use strict';

  var logger;
  return logger = {
    init: function() {
      mediator.subscribe('logger:error', this.errorMessage, this);
      mediator.subscribe('logger:info', this.infoMessage, this);
      return mediator.subscribe('logger:debug', this.debugMessage, this);
    },
    errorMessage: function(message) {
      return console.log('error', message);
    },
    infoMessage: function(message) {
      return console.log('info', message);
    },
    debugMessage: function(message) {
      return console.log('debug', message);
    }
  };
});
