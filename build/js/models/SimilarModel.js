var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'services/mediator', 'models/SimilarsCollection', 'services/proxy/proxy'], function(Backbone, mediator, SimilarsCollection, proxy) {
  var SimilarModel;
  return SimilarModel = (function(_super) {

    __extends(SimilarModel, _super);

    function SimilarModel() {
      return SimilarModel.__super__.constructor.apply(this, arguments);
    }

    SimilarModel.prototype.defaults = {
      selected: false
    };

    SimilarModel.prototype.getTrackInfo = function() {
      var _this = this;
      if (this.has('info')) {
        return;
      }
      return proxy.getTrackInfo(this.get('artist'), this.get('title')).done(function(data) {
        return _this.set({
          info: data
        });
      });
    };

    SimilarModel.prototype.getAudioUrl = function() {
      var _this = this;
      if (this.has('audio')) {
        return this.trigger('change:audio', this, this.get('audio'));
      }
      return proxy.searchAudio(this.get('artist'), this.get('title'), 0, 1).done(function(data) {
        return _this.set({
          audio: data[0]
        });
      });
    };

    SimilarModel.prototype.select = function(selected) {
      return this.trigger('select', selected);
    };

    SimilarModel.prototype.play = function() {
      this.on('change:audio', function() {
        mediator.publish('player:play', this);
        return mediator.publish('list:current', this);
      });
      return this.getAudioUrl();
    };

    return SimilarModel;

  })(Backbone.Model);
});
