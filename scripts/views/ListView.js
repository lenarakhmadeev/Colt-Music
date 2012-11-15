var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var ItemView, ListView, NavigationView, View, mediator, vk, _;
  _ = require('_');
  vk = require('vk');
  mediator = require('services/mediator');
  View = require('views/View');
  ItemView = require('views/ItemView');
  NavigationView = require('views/NavigationView');
  return ListView = (function(_super) {

    __extends(ListView, _super);

    function ListView() {
      return ListView.__super__.constructor.apply(this, arguments);
    }

    ListView.prototype.className = 'b-list';

    ListView.prototype.initialize = function(options) {
      return this.collection.own.on('change:content', this.render, this);
    };

    ListView.prototype._render = function() {
      var content;
      vk.callMethod('scrollWindow', 0, 0);
      content = this.collection.own.get('content');
      _.each(content, this.addItem, this);
      return mediator.publish('app:resize');
    };

    ListView.prototype.addItem = function(model) {
      var itemView;
      itemView = new ItemView({
        model: model
      });
      itemView.render();
      return this.append(itemView);
    };

    return ListView;

  })(View);
});
