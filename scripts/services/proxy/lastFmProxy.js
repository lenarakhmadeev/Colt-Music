
define(['jquery', 'module', 'services/proxy/LastFm', 'services/proxy/lastFmFilters'], function($, module, LastFm, lastFmFilters) {
  'use strict';

  var config, lastFm, lastFmProxy;
  config = module.config();
  lastFm = new LastFm(config.lastFm_key, config.lastFm_url);
  return lastFmProxy = {
    getTrackInfo: function(artist, title) {
      var dfd;
      dfd = new $.Deferred();
      lastFm.getTrackInfo(artist, title).done(function(data, textStatus, jqXHR) {
        var result;
        if ('error' in data) {
          return dfd.reject(data.message);
        } else {
          result = lastFmFilters.info(data);
          return dfd.resolve(result);
        }
      }).error(function(jqXHR, textStatus, message) {
        return dfd.reject(message);
      });
      return dfd.promise();
    },
    getSimilarTracks: function(artist, title, offset, count) {
      var dfd;
      dfd = new $.Deferred();
      lastFm.getSimilarTracks(artist, title, offset + count).done(function(data, textStatus, jqXHR) {
        var result;
        if ('error' in data) {
          return dfd.reject(data.message);
        } else {
          result = lastFmFilters.similar(data).slice(offset);
          return dfd.resolve(result);
        }
      }).error(function(jqXHR, textStatus, message) {
        return dfd.reject(message);
      });
      return dfd.promise();
    },
    getArtistTopTracks: function(artist, offset, count) {
      var dfd;
      dfd = new $.Deferred();
      lastfmApi.getArtistTopTracks(artist, 1, offset + count).done(function(data, textStatus, jqXHR) {
        var result;
        if ('error' in data) {
          return dfd.reject(data.message);
        } else {
          result = lastFmFilters.topTracks(data).slice(offset);
          return dfd.resolve(result);
        }
      }).error(function(jqXHR, textStatus, message) {
        return dfd.reject(message);
      });
      return dfd.promise();
    }
  };
});
