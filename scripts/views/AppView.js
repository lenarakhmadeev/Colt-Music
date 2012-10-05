var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['services/mediator', 'views/View', 'models/PlayerModel', 'views/PlayerView', 'collections/ListCollection', 'views/NavigationView', 'views/ListView', 'tpl!templates/app.html'], function(mediator, View, PlayerModel, PlayerView, ListCollection, NavigationView, ListView, AppTemplate) {
  'use strict';

  var AppView;
  return AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.template = AppTemplate;

    AppView.prototype.className = 'b-app';

    AppView.prototype.initialize = function(options) {
      this.initPlayer();
      this.initListCollection();
      this.initNavigation();
      this.initList();
      return mediator.subscribe('scroll', this._onScroll, this);
    };

    AppView.prototype._onScroll = function(scrollTop) {
      var pos;
      pos = Math.max(scrollTop - 75, 0);
      return this.$('.b-app__slider').offset({
        top: pos
      });
    };

    AppView.prototype.initPlayer = function() {
      var playerModel;
      playerModel = new PlayerModel();
      return this.playerView = new PlayerView({
        model: playerModel
      });
    };

    AppView.prototype.initListCollection = function() {
      this.listCollection = new ListCollection();
      return this.listCollection.getAudio();
    };

    AppView.prototype.initNavigation = function() {
      return this.navigationView = new NavigationView({
        collection: this.listCollection
      });
    };

    AppView.prototype.initList = function() {
      return this.listView = new ListView({
        collection: this.listCollection
      });
    };

    AppView.prototype._render = function() {
      this.playerView.render();
      this.append('.b-app__player-place', this.playerView);
      this.navigationView.render();
      this.append('.b-app__navigation-place', this.navigationView);
      this.listView.render();
      return this.append('.b-app__list-place', this.listView);
    };

    return AppView;

  })(View);
});
