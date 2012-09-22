var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/View', 'models/PlayerModel', 'views/PlayerView', 'models/ListCollection', 'views/ListView'], function(View, PlayerModel, PlayerView, ListCollection, ListView) {
  'use strict';

  var AppView;
  return AppView = (function(_super) {

    __extends(AppView, _super);

    function AppView() {
      return AppView.__super__.constructor.apply(this, arguments);
    }

    AppView.prototype.initialize = function(options) {
      this.initPlayer();
      return this.initList();
    };

    AppView.prototype._render = function() {
      this.append(this.playerView);
      return this.append(this.listView);
    };

    AppView.prototype.initPlayer = function() {
      var playerModel;
      playerModel = new PlayerModel();
      this.playerView = new PlayerView({
        model: playerModel
      });
      return this.playerView.render();
    };

    AppView.prototype.initList = function() {
      var listCollection;
      listCollection = new ListCollection();
      listCollection.getAudio();
      this.listView = new ListView({
        collection: listCollection
      });
      return this.listView.render();
    };

    return AppView;

  })(View);
});
