var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var InfoView, View, infoTemplate;
  View = require('views/View');
  infoTemplate = require('tpl!templates/info.html');
  return InfoView = (function(_super) {

    __extends(InfoView, _super);

    function InfoView() {
      return InfoView.__super__.constructor.apply(this, arguments);
    }

    InfoView.prototype.template = infoTemplate;

    InfoView.prototype.className = 'b-item-info';

    InfoView.prototype.initialize = function(options) {
      return this.model.on('change:info', this.render, this);
    };

    InfoView.prototype.serialize = function() {
      return {
        album: this.model.get('info.album'),
        tags: (this.model.get('info.tags') || []).join(', ')
      };
    };

    return InfoView;

  })(View);
});
