var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'tpl!templates/more.html'], function(View, moreTemplate) {
  'use strict';

  var MoreButtonView;
  return MoreButtonView = (function(_super) {

    __extends(MoreButtonView, _super);

    function MoreButtonView() {
      return MoreButtonView.__super__.constructor.apply(this, arguments);
    }

    MoreButtonView.prototype.template = moreTemplate;

    MoreButtonView.prototype.className = 'b-more-button';

    MoreButtonView.prototype.events = {
      'click .b-more-button__show-more-button': 'getMoreSimilars'
    };

    MoreButtonView.prototype.initialize = function(options) {
      return this.collection.own.on('change:status', this.render, this);
    };

    MoreButtonView.prototype.serialize = function() {
      return {
        status: this.collection.own.get('status')
      };
    };

    MoreButtonView.prototype.getMoreSimilars = function() {
      return this.collection.getMoreSimilars();
    };

    return MoreButtonView;

  })(View);
});
