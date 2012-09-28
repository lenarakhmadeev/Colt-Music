var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/TrackModel'], function(TrackModel) {
  'use strict';

  var SimilarModel;
  return SimilarModel = (function(_super) {

    __extends(SimilarModel, _super);

    function SimilarModel() {
      return SimilarModel.__super__.constructor.apply(this, arguments);
    }

    SimilarModel.prototype.defaults = {
      artist: null,
      title: null,
      selected: false,
      played: false,
      type: 'similar',
      has_info: false,
      has_audio: false,
      info: {
        wiki: null,
        album: null,
        images: null,
        tags: null
      },
      audio: {
        url: null,
        audio_id: null,
        owner_id: null,
        duration: null
      }
    };

    return SimilarModel;

  })(TrackModel);
});
