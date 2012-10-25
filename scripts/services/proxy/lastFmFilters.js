
define(function(require) {
  var jpath, lastFmFilters;
  jpath = require('jpath');
  'use strict';

  return lastFmFilters = {
    info: function(data) {
      var rawImages;
      rawImages = jpath(data, '.track.album.image');
      return {
        album: jpath(data, '.track.album.title'),
        images: this.filterInfoImages(rawImages),
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
    filterImages: function(data, sizes) {
      var image, result, _i, _len;
      if (data == null) {
        return null;
      }
      result = {};
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        image = data[_i];
        result[sizes[image.size]] = image['#text'];
      }
      return result;
    },
    infoImageSizes: {
      'small': 64,
      'medium': 126,
      'large': 174,
      'extralarge': 300
    },
    filterInfoImages: function(data) {
      return this.filterImages(data, this.infoImageSizes);
    },
    similarImageSizes: {
      'small': 34,
      'medium': 64,
      'large': 126,
      'extralarge': 300
    },
    filterSimilarImages: function(data) {
      return this.filterImages(data, this.similarImageSizes);
    },
    filterSimilar: function(data) {
      var rawImages;
      rawImages = jpath(data, '.image');
      return {
        artist: jpath(data, '.artist.name'),
        title: jpath(data, '.name'),
        images: this.filterSimilarImages(rawImages)
      };
    }
  };
});
