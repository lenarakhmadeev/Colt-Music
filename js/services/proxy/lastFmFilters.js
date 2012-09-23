
define(['jpath'], function(jpath) {
  'use strict';

  var lastFmFilters;
  return lastFmFilters = {
    info: function(data) {
      var rawImages;
      rawImages = jpath(data, '.track.album.image');
      return {
        album: jpath(data, '.track.album.title'),
        images: this.filterImages(rawImages),
        tags: jpath(data, 'track.toptags.tag.name', true),
        wiki: jpath(data, '.track.wiki')
      };
    },
    similar: function(data) {
      var tracks;
      tracks = jpath(data, '.similartracks.track');
      if (_.isString(tracks[0])) {
        return [];
      }
      return _.map(tracks, this.filterSimilar, this);
    },
    topTracks: function() {},
    filterImages: function(data) {
      var image, result, _i, _len;
      if (data == null) {
        return null;
      }
      result = {};
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        image = data[_i];
        result[image.size] = image['#text'];
      }
      return result;
    },
    filterSimilar: function(data) {
      var rawImages;
      rawImages = jpath(data, '.image');
      return {
        artist: jpath(data, '.artist.name'),
        title: jpath(data, '.name'),
        images: this.filterImages(rawImages)
      };
    }
  };
});
