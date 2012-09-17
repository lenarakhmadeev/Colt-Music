var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'views/SimilarView', 'views/PhraseView', 'views/MoreButtonView', 'tpl!templates/similars.html'], function(View, SimilarView, PhraseView, MoreButtonView, similarsTemplate) {
  var SimilarsView;
  return SimilarsView = (function(_super) {

    __extends(SimilarsView, _super);

    function SimilarsView() {
      return SimilarsView.__super__.constructor.apply(this, arguments);
    }

    SimilarsView.prototype.template = similarsTemplate;

    SimilarsView.prototype.className = 'similar-container';

    SimilarsView.prototype.events = {
      'click .ItemFooter': 'getMoreSimilars'
    };

    SimilarsView.prototype.initialize = function(options) {
      this.collection.bind('add', this.addItem, this);
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
      return $('.ItemDelim', this.$el).append(this.phraseView.el);
    };

    SimilarsView.prototype.renderMoreButton = function() {
      this.moreButtonView.render();
      return $('.ItemFooter', this.$el).append(this.moreButtonView.el);
    };

    SimilarsView.prototype.addItem = function(model) {
      var simView;
      simView = new SimilarView({
        model: model
      });
      simView.render();
      return $('.ItemSimCont', this.$el).append(simView.el);
    };

    SimilarsView.prototype.getMoreSimilars = function() {
      return this.collection.getMoreSimilars();
    };

    return SimilarsView;

  })(View);
});
