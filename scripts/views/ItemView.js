var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var InfoView, ItemView, SimilarsView, View, itemTemplate;
  View = require('views/View');
  SimilarsView = require('views/SimilarsView');
  InfoView = require('views/InfoView');
  itemTemplate = require('tpl!templates/item.html');
  return ItemView = (function(_super) {

    __extends(ItemView, _super);

    function ItemView() {
      return ItemView.__super__.constructor.apply(this, arguments);
    }

    ItemView.prototype.template = itemTemplate;

    ItemView.prototype.className = 'b-item';

    ItemView.prototype.events = {
      'click .b-item__play-button': 'play',
      'click .b-item__pause-button': 'pause',
      'click .b-item__album-cover': 'togglePlay',
      'click .b-item__track-title': 'togglePlay',
      'click .b-item__like-button': 'addToWall'
    };

    ItemView.prototype.initialize = function(options) {
      this.model.on('change:selected', this.renderSelected, this);
      this.model.on('change:played', this.renderPlayed, this);
      this.model.on('change:info', this.renderCover, this);
      this.similarsView = new SimilarsView({
        collection: this.model.similarsCollection
      });
      return this.infoView = new InfoView({
        model: this.model
      });
    };

    ItemView.prototype.serialize = function() {
      return {
        artist: this.model.get('artist'),
        title: this.model.get('title')
      };
    };

    ItemView.prototype._render = function() {
      this.infoView.render();
      this.append('.b-item__info-place', this.infoView);
      this.similarsView.render();
      this.append('.b-item__similars-place', this.similarsView);
      this.renderCover();
      this.renderSelected();
      return this.renderPlayed();
    };

    ItemView.prototype.renderCover = function() {
      var cover;
      cover = this.model.get('info.images.126') || 'images/cover/big.png';
      return this.$('.b-item__cover-image').attr('src', cover);
    };

    ItemView.prototype.renderSelected = function() {
      if (this.model.get('selected')) {
        return this.$el.addClass('b-item_selected');
      } else {
        return this.$el.removeClass('b-item_selected');
      }
    };

    ItemView.prototype.renderPlayed = function() {
      if (this.model.get('played')) {
        this.$('.b-item__play-button').hide();
        this.$('.b-item__pause-button').show();
        return this.$('.b-item__album-cover, .b-item__track-title').attr('title', 'Пауза');
      } else {
        this.$('.b-item__play-button').show();
        this.$('.b-item__pause-button').hide();
        return this.$('.b-item__album-cover, .b-item__track-title').attr('title', 'Играть');
      }
    };

    ItemView.prototype.play = function() {
      return this.model.play();
    };

    ItemView.prototype.pause = function() {
      return this.model.pause();
    };

    ItemView.prototype.togglePlay = function() {
      return this.model.togglePlay();
    };

    ItemView.prototype.addToWall = function() {
      return this.model.addToWall();
    };

    return ItemView;

  })(View);
});
