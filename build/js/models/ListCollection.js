var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'models/ItemModel', 'proxy'], function(Backbone, ItemModel, proxy) {
  var ListCollection;
  return ListCollection = (function(_super) {

    __extends(ListCollection, _super);

    function ListCollection() {
      return ListCollection.__super__.constructor.apply(this, arguments);
    }

    ListCollection.prototype.model = ItemModel;

    ListCollection.prototype.initialize = function(models, options) {
      return this.on('reset add', this.makeModelsIds, this);
    };

    ListCollection.prototype.getAudio = function() {
      var _this = this;
      return proxy.getAudio().done(function(data) {
        return _this.reset(data);
      });
    };

    ListCollection.prototype.makeModelsIds = function() {
      var id, model, _i, _len, _ref, _results;
      id = 1;
      _ref = this.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        model.set('id', id);
        _results.push(id++);
      }
      return _results;
    };

    return ListCollection;

  })(Backbone.Collection);
});
