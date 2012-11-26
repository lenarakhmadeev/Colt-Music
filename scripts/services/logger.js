
define(function(require) {
  var logger, mediator, noty, urlParams;
  noty = require('services/noty');
  mediator = require('services/mediator');
  urlParams = require('services/urlParams');
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
      console.log('logger.log', message);
      return _gaq.push(['_trackEvent', 'logger', 'log', message, urlParams['viewer_id']]);
    },
    error: function(message) {
      console.log('logger.error', message);
      return _gaq.push(['_trackEvent', 'logger', 'error', message, urlParams['viewer_id']]);
    }
  };
});
