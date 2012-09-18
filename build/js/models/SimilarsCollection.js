var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/Collection', 'services/proxy/proxy', 'models/SimilarModel'], function(Collection, proxy, SimilarModel) {
  var SimilarsCollection;
  return SimilarsCollection = (function(_super) {

    __extends(SimilarsCollection, _super);

    function SimilarsCollection() {
      this.getMoreSimilars = __bind(this.getMoreSimilars, this);
      return SimilarsCollection.__super__.constructor.apply(this, arguments);
    }

    SimilarsCollection.prototype.model = SimilarModel;

    SimilarsCollection.prototype.initialize = function(models, options) {};

    SimilarsCollection.prototype.setParent = function(parent) {
      this.parent = parent;
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
      this.setStatus('loading');
      return proxy.getSimilarTracks(this.getArtist(), this.getTitle(), this.offset, this.count).done(function(data) {
        _this.offset += _this.count;
        _this.wait = false;
        if (data.length < _this.count) {
          _this.setStatus('no');
        } else {
          _this.setStatus('yes');
        }
        return _this.add(data);
      }).fail(function() {
        return _this.setStatus('no');
      });
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
