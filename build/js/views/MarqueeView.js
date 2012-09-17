var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'views/View'], function($, View) {
  var MarqueeView;
  return MarqueeView = (function(_super) {

    __extends(MarqueeView, _super);

    function MarqueeView() {
      return MarqueeView.__super__.constructor.apply(this, arguments);
    }

    MarqueeView.prototype.initialize = function() {
      return this.model.on('change:artist', this.render, this);
    };

    MarqueeView.prototype._render = function() {
      return this.$el.html(this.getLine());
    };

    MarqueeView.prototype.getLine = function() {
      var artist, duration, title;
      artist = this.model.get('artist');
      title = this.model.get('title');
      duration = this.model.get('duration');
      return "" + duration + " " + artist + " - " + title;
    };

    return MarqueeView;

  })(View);
});
