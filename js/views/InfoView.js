var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'tpl!templates/info.html'], function(View, infoTemplate) {
  'use strict';

  var InfoView;
  return InfoView = (function(_super) {

    __extends(InfoView, _super);

    function InfoView() {
      return InfoView.__super__.constructor.apply(this, arguments);
    }

    InfoView.prototype.template = infoTemplate;

    InfoView.prototype.initialize = function(options) {
      return this.model.bind('change:info', this.render, this);
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
