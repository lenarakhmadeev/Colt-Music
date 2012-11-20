var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var $, MoreButtonView, PhraseView, SimilarView, SimilarsView, View, mediator, similarsTemplate, _;
  $ = require('$');
  _ = require('_');
  mediator = require('services/mediator');
  View = require('views/View');
  SimilarView = require('views/SimilarView');
  PhraseView = require('views/PhraseView');
  MoreButtonView = require('views/MoreButtonView');
  similarsTemplate = require('tpl!templates/similars.html');
  return SimilarsView = (function(_super) {

    __extends(SimilarsView, _super);

    function SimilarsView() {
      return SimilarsView.__super__.constructor.apply(this, arguments);
    }

    SimilarsView.prototype.template = similarsTemplate;

    SimilarsView.prototype.className = 'b-similars';

    SimilarsView.prototype.initialize = function(options) {
      this.collection.on('updated', this.updateSimilars, this);
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

    SimilarsView.prototype.updateSimilars = function() {
      this.$('.b-similars__similars-container-col1').empty();
      this.$('.b-similars__similars-container-col2').empty();
      return this.renderSimilars();
    };

    SimilarsView.prototype.renderSimilars = function() {
      var left, right, _ref;
      if (!this.collection.length) {
        return;
      }
      _ref = this.divideModels(this.collection.models), left = _ref[0], right = _ref[1];
      this.renderColumn('.b-similars__similars-container-col1', left);
      this.renderColumn('.b-similars__similars-container-col2', right);
      this.$('.b-similars__similars-container').show();
      return mediator.publish('app:resize');
    };

    SimilarsView.prototype.renderColumn = function(columnSelector, models) {
      var callback;
      callback = function(model) {
        return this.addItem(columnSelector, model);
      };
      return _.each(models, callback, this);
    };

    SimilarsView.prototype.divideModels = function(models) {
      var middle;
      middle = Math.ceil(models.length / 2);
      return [models.slice(0, middle), models.slice(middle)];
    };

    SimilarsView.prototype.renderPhrase = function() {
      this.phraseView.render();
      return this.append('.b-similars__phrase-place', this.phraseView);
    };

    SimilarsView.prototype.renderMoreButton = function() {
      this.moreButtonView.render();
      return this.append('.b-similars__more-button-place', this.moreButtonView);
    };

    SimilarsView.prototype.addItem = function(columnSelector, model) {
      var simView;
      simView = new SimilarView({
        model: model
      });
      simView.render();
      return this.append(columnSelector, simView);
    };

    return SimilarsView;

  })(View);
});
