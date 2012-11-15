var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var $, MarqueeView, View;
  $ = require('$');
  View = require('views/View');
  return MarqueeView = (function(_super) {

    __extends(MarqueeView, _super);

    function MarqueeView() {
      return MarqueeView.__super__.constructor.apply(this, arguments);
    }

    MarqueeView.prototype.className = 'b-marquee';

    MarqueeView.prototype.initialize = function(options) {
      return this.model.on('change:current', this.render, this);
    };

    MarqueeView.prototype._render = function() {
      return this.$el.marquee(this.getLine(), 'low');
    };

    MarqueeView.prototype.getLine = function() {
      var current, time;
      current = this.model.get('current');
      if (current == null) {
        return '';
      }
      time = this.convertTime(current.get('audio.duration'));
      return "" + time + " " + (current.get('artist')) + " - " + (current.get('title'));
    };

    MarqueeView.prototype.convertTime = function(totalSec, separator) {
      var hours, minutes, result, seconds;
      if (separator == null) {
        separator = ':';
      }
      hours = parseInt(totalSec / 3600);
      minutes = parseInt(totalSec / 60) % 60;
      seconds = totalSec % 60;
      result = [];
      if (hours > 0) {
        result.push(hours);
        result.push(this.formatTime(minutes));
        result.push(this.formatTime(seconds));
      } else {
        if (minutes > 0) {
          result.push(minutes);
          result.push(this.formatTime(seconds));
        } else {
          result.push(seconds);
        }
      }
      return result.join(separator);
    };

    MarqueeView.prototype.formatTime = function(time) {
      if (time < 10) {
        return '0' + time;
      } else {
        return time;
      }
    };

    return MarqueeView;

  })(View);
});
