var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var C, SimilarView, View, similarTemplate;
  View = require('views/View');
  similarTemplate = require('tpl!templates/similar.html');
  C = require('constants');
  return SimilarView = (function(_super) {

    __extends(SimilarView, _super);

    function SimilarView() {
      return SimilarView.__super__.constructor.apply(this, arguments);
    }

    SimilarView.prototype.template = similarTemplate;

    SimilarView.prototype.className = 'b-similar';

    SimilarView.prototype.events = {
      'click .b-similar__play-button': 'play',
      'click .b-similar__pause-button': 'pause',
      'click .b-similar__album-cover': 'togglePlay',
      'click .b-similar__track-title': 'togglePlay',
      'click .b-similar__add-button': 'addToAudio',
      'click .b-similar__like-button': 'addToWall',
      'click .b-similar__wiki-button': 'showWiki'
    };

    SimilarView.prototype.initialize = function(options) {
      this.model.on('change:selected', this.renderSelected, this);
      return this.model.on('change:played', this.renderPlayed, this);
    };

    SimilarView.prototype._render = function() {
      this.renderSelected();
      return this.renderPlayed();
    };

    SimilarView.prototype.serialize = function() {
      return {
        artist: this.model.get('artist'),
        title: this.model.get('title'),
        cover: this.model.get('info.images.64') || C.SMALL_COVER
      };
    };

    SimilarView.prototype.renderSelected = function() {
      if (this.model.get('selected')) {
        return this.$el.addClass('b-similar_selected');
      } else {
        return this.$el.removeClass('b-similar_selected');
      }
    };

    SimilarView.prototype.renderPlayed = function() {
      if (this.model.get('played')) {
        this.$('.b-similar__play-button').hide();
        return this.$('.b-similar__pause-button').show();
      } else {
        this.$('.b-similar__play-button').show();
        return this.$('.b-similar__pause-button').hide();
      }
    };

    SimilarView.prototype.play = function() {
      return this.model.play();
    };

    SimilarView.prototype.pause = function() {
      return this.model.pause();
    };

    SimilarView.prototype.togglePlay = function() {
      return this.model.togglePlay();
    };

    SimilarView.prototype.addToAudio = function() {
      return this.model.addToAudio();
    };

    SimilarView.prototype.addToWall = function() {
      return this.model.addToWall();
    };

    SimilarView.prototype.showWiki = function() {};

    return SimilarView;

  })(View);
});
