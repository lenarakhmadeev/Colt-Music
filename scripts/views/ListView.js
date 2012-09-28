var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'views/View', 'views/ItemView', 'views/NavigationView'], function(_, View, ItemView, NavigationView) {
  'use strict';

  var ListView;
  return ListView = (function(_super) {

    __extends(ListView, _super);

    function ListView() {
      return ListView.__super__.constructor.apply(this, arguments);
    }

    ListView.prototype.className = 'b-list';

    ListView.prototype.initialize = function(options) {
      this.collection.own.on('change:content', this.render, this);
      return this.navigationView = new NavigationView({
        collection: this.collection
      });
    };

    ListView.prototype._render = function() {
      this.renderNavigation();
      return this.renderItems();
    };

    ListView.prototype.renderNavigation = function() {
      this.navigationView.render();
      return this.append(this.navigationView);
    };

    ListView.prototype.renderItems = function() {
      var content;
      content = this.collection.own.get('content');
      return _.each(content, this.addItem, this);
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
