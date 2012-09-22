var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'views/View', 'tpl!templates/similar.html'], function(_, View, similarTemplate) {
  'use strict';

  var SimilarView;
  return SimilarView = (function(_super) {

    __extends(SimilarView, _super);

    function SimilarView() {
      this.addToWall = __bind(this.addToWall, this);

      this.addToAudio = __bind(this.addToAudio, this);

      this.showWiki = __bind(this.showWiki, this);
      return SimilarView.__super__.constructor.apply(this, arguments);
    }

    SimilarView.prototype.template = similarTemplate;

    SimilarView.prototype.className = 'SimItem';

    SimilarView.prototype.events = {
      'click .SimPlayB, .SmallImg': 'play'
    };

    SimilarView.prototype.initialize = function(options) {
      return this.model.bind('change:selected', this.renderSelected, this);
    };

    SimilarView.prototype.serialize = function() {
      return {
        artist: this.model.get('artist'),
        title: this.model.get('title'),
        cover: this.model.get('info.images.medium') || 'http://placekitten.com/g/64/64'
      };
    };

    SimilarView.prototype.renderSelected = function() {
      if (this.model.get('selected')) {
        return this.$el.addClass('selected');
      } else {
        return this.$el.removeClass('selected');
      }
    };

    SimilarView.prototype.play = function() {
      return this.model.play();
    };

    SimilarView.prototype.showWiki = function() {};

    SimilarView.prototype.addToAudio = function() {};

    SimilarView.prototype.addToWall = function() {};

    return SimilarView;

  })(View);
});
