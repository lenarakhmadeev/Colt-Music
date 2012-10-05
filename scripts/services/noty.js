
define(['underscore', 'jquery', 'vk', 'humane'], function(_, $, vk, humane) {
  var noty;
  return noty = {
    timeout: 1500,
    init: function() {
      vk.callMethod('scrollSubscribe', {
        fireEvent: true
      });
      vk.addCallback('onScroll', _.bind(this._onScroll, this));
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
