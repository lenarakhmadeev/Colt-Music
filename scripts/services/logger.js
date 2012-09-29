
define(['jquery', 'vk', 'services/mediator', 'humane'], function($, vk, mediator, humane) {
  'use strict';

  var logger;
  return logger = {
    init: function() {
      vk.callMethod('scrollSubscribe', {
        fireEvent: true
      });
      vk.addCallback('onScroll', this.onScroll);
      mediator.subscribe('logger:error', this.errorMessage, this);
      mediator.subscribe('logger:info', this.infoMessage, this);
      return mediator.subscribe('logger:debug', this.debugMessage, this);
    },
    errorMessage: function(message) {
      console.log('error', message);
      return this._showMessage(message);
    },
    infoMessage: function(message) {
      console.log('info', message);
      return this._showMessage(message);
    },
    debugMessage: function(message) {
      console.log('debug', message);
      return this._showMessage(message);
    },
    _showMessage: function(message, type) {
      humane.log(message, {
        timeout: 1500,
        clickToClose: true
      });
      return $('.humane').offset({
        top: this._getPosition()
      });
    },
    _getPosition: function() {
      return this.topPosition;
    },
    onScroll: function(scrollTop, windowHeight) {
      console.log('onscroll', this, scrollTop);
      return logger.topPosition = scrollTop;
    }
  };
});
