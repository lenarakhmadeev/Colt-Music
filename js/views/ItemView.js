var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'views/SimilarsView', 'views/InfoView', 'tpl!templates/item.html'], function(View, SimilarsView, InfoView, itemTemplate) {
  'use strict';

  var ItemView;
  return ItemView = (function(_super) {

    __extends(ItemView, _super);

    function ItemView() {
      return ItemView.__super__.constructor.apply(this, arguments);
    }

    ItemView.prototype.template = itemTemplate;

    ItemView.prototype.className = 'item';

    ItemView.prototype.events = {
      'click .BigImg': 'play'
    };

    ItemView.prototype.initialize = function(options) {
      this.model.bind('change:selected', this.renderSelected, this);
      this.model.bind('change:info', this.renderCover, this);
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
      this.append('.ItemAlbumCont', this.infoView);
      this.similarsView.render();
      this.append(this.similarsView);
      return this.renderCover();
    };

    ItemView.prototype.renderCover = function() {
      var cover;
      cover = this.model.get('info.images.large') || 'images/big.png';
      return this.$('.BigImg').attr('src', cover);
    };

    ItemView.prototype.renderSelected = function() {
      if (this.model.get('selected')) {
        return this.$el.addClass('selected');
      } else {
        return this.$el.removeClass('selected');
      }
    };

    ItemView.prototype.play = function() {
      return this.model.play();
    };

    return ItemView;

  })(View);
});
