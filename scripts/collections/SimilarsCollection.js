var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(function(require) {
  var Collection, SimilarModel, SimilarsCollection, proxy, _;
  _ = require('_');
  Collection = require('collections/Collection');
  proxy = require('services/proxy/proxy');
  SimilarModel = require('models/SimilarModel');
  return SimilarsCollection = (function(_super) {

    __extends(SimilarsCollection, _super);

    function SimilarsCollection() {
      return SimilarsCollection.__super__.constructor.apply(this, arguments);
    }

    SimilarsCollection.prototype.model = SimilarModel;

    SimilarsCollection.prototype.initialize = function(models, options) {};

    SimilarsCollection.prototype.setParent = function(parent) {
      this.parent = parent;
    };

    SimilarsCollection.prototype.count = 2;

    SimilarsCollection.prototype.offset = 0;

    SimilarsCollection.prototype.getMoreSimilars = function() {
      var _this = this;
      this.setStatus('loading');
      return proxy.getSimilarTracks(this.getArtist(), this.getTitle(), this.offset, this.count).done(function(data) {
        var status;
        _this.offset += _this.count;
        status = data.length < _this.count ? 'no' : 'yes';
        _this.setStatus(status);
        _.each(data, _this.addRaw, _this);
        return _this.trigger('updated');
      }).fail(function() {
        return _this.setStatus('no');
      });
    };

    SimilarsCollection.prototype.addRaw = function(data) {
      data.info = {
        images: data.images
      };
      delete data.images;
      return this.add(data);
    };

    SimilarsCollection.prototype.getArtist = function() {
      return this.parent.get('artist');
    };

    SimilarsCollection.prototype.getTitle = function() {
      return this.parent.get('title');
    };

    SimilarsCollection.prototype.setStatus = function(status) {
      return this.own.set('status', status);
    };

    SimilarsCollection.prototype.first_geted = false;

    SimilarsCollection.prototype.getFirstSimilars = function() {
      if (this.first_geted) {
        return;
      }
      this.first_geted = true;
      return this.getMoreSimilars();
    };

    return SimilarsCollection;

  })(Collection);
});
