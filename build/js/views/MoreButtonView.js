var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'tpl!templates/more.html'], function(View, moreTemplate) {
  var MoreButtonView;
  return MoreButtonView = (function(_super) {

    __extends(MoreButtonView, _super);

    function MoreButtonView() {
      return MoreButtonView.__super__.constructor.apply(this, arguments);
    }

    MoreButtonView.prototype.template = moreTemplate;

    MoreButtonView.prototype.tagName = 'span';

    MoreButtonView.prototype.className = 'MoreButton';

    MoreButtonView.prototype.initialize = function(options) {
      return this.collection.own.bind('change:status', this.render, this);
    };

    MoreButtonView.prototype.serialize = function() {
      return {
        status: this.collection.own.get('status')
      };
    };

    return MoreButtonView;

  })(View);
});
