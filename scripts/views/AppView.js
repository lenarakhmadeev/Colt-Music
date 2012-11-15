var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var AppTemplate, AppView, ListCollection, ListView, NavigationView, PlayerModel, PlayerView, View, mediator, vk;
  mediator = require('services/mediator');
  vk = require('vk');
  View = require('views/View');
  PlayerModel = require('models/PlayerModel');
  PlayerView = require('views/PlayerView');
  ListCollection = require('collections/ListCollection');
  NavigationView = require('views/NavigationView');
  ListView = require('views/ListView');
  AppTemplate = require('tpl!templates/app.html');
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
      mediator.subscribe('scroll', this.scroll, this);
      return mediator.subscribe('app:resize', this.resizeWindow, this);
    };

    AppView.prototype.scroll = function(scrollTop) {
      var pos;
      pos = Math.max(scrollTop - 75, 0);
      return this.$('.b-app__slider').offset({
        top: pos
      });
    };

    AppView.prototype.resizeWindow = function() {
      var height;
      height = this.$el.height();
      if (this.height === height) {
        return;
      }
      this.height = height;
      return vk.callMethod('resizeWindow', null, height + 200);
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
      this.append('.b-app__player-place', this.playerView);
      this.append('.b-app__navigation-place', this.navigationView);
      this.append('.b-app__list-place', this.listView);
      this.playerView.render();
      this.listView.render();
      return this.navigationView.render();
    };

    return AppView;

  })(View);
});
