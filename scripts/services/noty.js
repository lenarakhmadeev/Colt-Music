
define(function(require) {
  var $, humane, mediator, noty, _;
  _ = require('_');
  $ = require('$');
  mediator = require('services/mediator');
  humane = require('humane');
  return noty = {
    timeout: 1500,
    init: function() {
      mediator.subscribe('scroll', this._onScroll, this);
      return this._extendHumane();
    },
    _extendHumane: function() {
      humane.error = humane.spawn({
        addnCls: 'humane-original-error',
        timeout: this.timeout
      });
      return humane.success = humane.spawn({
        addnCls: 'humane-original-success',
        timeout: this.timeout
      });
    },
    error: function(message) {
      return this._notify('error', message);
    },
    success: function(message) {
      return this._notify('success', message);
    },
    info: function(message) {
      return this._notify('log', message);
    },
    _notify: function(type, message) {
      console.log('message', message, this);
      humane[type](message);
      return $('.humane').offset({
        top: this._getPosition()
      });
    },
    _getPosition: function() {
      return this.topPosition;
    },
    _onScroll: function(topPosition) {
      this.topPosition = topPosition;
    }
  };
});
