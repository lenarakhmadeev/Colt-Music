
define(function(require) {
  var logger, mediator, noty;
  noty = require('services/noty');
  mediator = require('services/mediator');
  'use strict';

  return logger = {
    init: function() {
      noty.init();
      mediator.subscribe('logger:user:success', this.userSuccess, this);
      mediator.subscribe('logger:user:error', this.userError, this);
      mediator.subscribe('logger:user:info', this.userInfo, this);
      mediator.subscribe('logger:log', this.log, this);
      return mediator.subscribe('logger:error', this.error, this);
    },
    userSuccess: function(message) {
      return noty.success(message);
    },
    userError: function(message) {
      return noty.error(message);
    },
    userInfo: function(message) {
      return noty.info(message);
    },
    log: function(message) {
      return console.log('logger.log', message);
    },
    error: function(message) {
      return console.log('logger.error', message);
    }
  };
});
