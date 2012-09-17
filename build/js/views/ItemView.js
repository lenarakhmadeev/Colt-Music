var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'views/SimilarsView', 'tpl!templates/item.html'], function(View, SimilarsView, itemTemplate) {
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
      this.model.bind('change', this.render, this);
      this.model.bind('select', this.renderSelected, this);
      return this.similarsView = new SimilarsView({
        collection: this.model.similarsCollection
      });
    };

    ItemView.prototype._render = function() {
      this.similarsView.render();
      return this.append(this.similarsView);
    };

    ItemView.prototype.renderSelected = function(selected) {
      if (selected) {
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
