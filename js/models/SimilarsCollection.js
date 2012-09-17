var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/Collection', 'proxy', 'models/SimilarModel'], function(Collection, proxy, SimilarModel) {
  var SimilarsCollection;
  return SimilarsCollection = (function(_super) {

    __extends(SimilarsCollection, _super);

    function SimilarsCollection() {
      this.getMoreSimilars = __bind(this.getMoreSimilars, this);
      return SimilarsCollection.__super__.constructor.apply(this, arguments);
    }

    SimilarsCollection.prototype.model = SimilarModel;

    SimilarsCollection.prototype.initialize = function(models, options) {
      return this.on('reset add', this.makeModelsIds, this);
    };

    SimilarsCollection.prototype.setDesignation = function(artist, title) {
      this.artist = artist;
      this.title = title;
    };

    SimilarsCollection.prototype.count = 2;

    SimilarsCollection.prototype.offset = 0;

    SimilarsCollection.prototype.wait = false;

    SimilarsCollection.prototype.getMoreSimilars = function() {
      var _this = this;
      if (this.wait) {
        return;
      }
      this.wait = true;
      this.own.set('status', 'loading');
      return proxy.getSimilarTracks(this.artist, this.title, this.offset, this.count).done(function(data) {
        _this.offset += _this.count;
        _this.wait = false;
        if (data.length < _this.count) {
          _this.own.set('status', 'no');
        } else {
          _this.own.set('status', 'yes');
        }
        return _this.add(data);
      }).fail(function() {
        return _this.own.set('status', 'no');
      });
    };

    SimilarsCollection.prototype.first_geted = false;

    SimilarsCollection.prototype.getFirstSimilars = function() {
      if (this.first_geted) {
        return;
      }
      this.first_geted = true;
      return this.getMoreSimilars();
    };

    SimilarsCollection.prototype.makeModelsIds = function() {
      var id, model, _i, _len, _ref, _results;
      id = 1;
      _ref = this.models;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        model.id = id;
        _results.push(id++);
      }
      return _results;
    };

    return SimilarsCollection;

  })(Collection);
});
