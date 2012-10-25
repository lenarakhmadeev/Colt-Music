var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var $, MoreButtonView, PhraseView, SimilarView, SimilarsView, View, mediator, similarsTemplate;
  $ = require('jquery');
  mediator = require('services/mediator');
  View = require('views/View');
  SimilarView = require('views/SimilarView');
  PhraseView = require('views/PhraseView');
  MoreButtonView = require('views/MoreButtonView');
  similarsTemplate = require('tpl!templates/similars.html');
  'use strict';

  return SimilarsView = (function(_super) {

    __extends(SimilarsView, _super);

    function SimilarsView() {
      return SimilarsView.__super__.constructor.apply(this, arguments);
    }

    SimilarsView.prototype.template = similarsTemplate;

    SimilarsView.prototype.className = 'b-similars';

    SimilarsView.prototype.initialize = function(options) {
      this.collection.on('add', this.addItem, this);
      this.phraseView = new PhraseView({
        collection: this.collection
      });
      return this.moreButtonView = new MoreButtonView({
        collection: this.collection
      });
    };

    SimilarsView.prototype._render = function() {
      this.renderSimilars();
      this.renderPhrase();
      return this.renderMoreButton();
    };

    SimilarsView.prototype.renderSimilars = function() {
      return this.collection.each(this.addItem, this);
    };

    SimilarsView.prototype.renderPhrase = function() {
      this.phraseView.render();
      return this.append('.b-similars__phrase-place', this.phraseView);
    };

    SimilarsView.prototype.renderMoreButton = function() {
      this.moreButtonView.render();
      return this.append('.b-similars__more-button-place', this.moreButtonView);
    };

    SimilarsView.prototype.addItem = function(model) {
      var simView;
      simView = new SimilarView({
        model: model
      });
      simView.render();
      this.append('.b-similars__similars-container', simView);
      this.$('.b-similars__similars-container').show();
      return mediator.publish('app:resize');
    };

    return SimilarsView;

  })(View);
});
