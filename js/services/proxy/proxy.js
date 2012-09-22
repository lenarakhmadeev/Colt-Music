
define(['jquery', 'module', 'underscore', 'services/proxy/LastFm', 'services/proxy/lastFmFilters', 'vk', 'services/proxy/vkFilters'], function($, module, _, LastFm, lastFmFilters, vk, vkFilters) {
  'use strict';

  var Proxy, config, lastFm, proxy;
  Proxy = (function() {

    function Proxy(lastFm, vk) {
      this.lastFm = lastFm;
      this.vk = vk;
    }

    Proxy.prototype.getTrackInfo = function(artist, title) {
      var dfd;
      dfd = new $.Deferred();
      this.lastFm.getTrackInfo(artist, title).done(function(data, textStatus, jqXHR) {
        if ('error' in data) {
          return dfd.reject(data.message);
        } else {
          return dfd.resolve(lastFmFilters.info(data));
        }
      }).error(function(jqXHR, textStatus, message) {
        return dfd.reject(message);
      });
      return dfd.promise();
    };

    Proxy.prototype.getSimilarTracks = function(artist, title, offset, count) {
      var dfd;
      dfd = new $.Deferred();
      this.lastFm.getSimilarTracks(artist, title, offset + count).done(function(data, textStatus, jqXHR) {
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
    };

    Proxy.prototype.getArtistTopTracks = function(artist, offset, count) {
      var dfd;
      dfd = new $.Deferred();
      this.lastfmApi.getArtistTopTracks(artist, 1, offset + count).done(function(data, textStatus, jqXHR) {
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
    };

    Proxy.prototype.searchAudio = function(artist, title, offset, count) {
      var dfd, params;
      dfd = new $.Deferred();
      params = {
        q: "" + artist + " - " + title,
        sort: 2,
        auto_complete: 1,
        count: count,
        offset: offset
      };
      this.vk.api('audio.search', params, function(data) {
        var result;
        if ('error' in data) {
          return dfd.reject(data.error);
        } else {
          result = vkFilters.searchAudio(data.response);
          return dfd.resolve(result);
        }
      });
      return dfd.promise();
    };

    Proxy.prototype.getAudioUrl = function(artist, title) {
      var dfd;
      dfd = new $.Deferred();
      this.searchAudio(artist, title, 0, 1).done(function(data) {
        var audio;
        audio = _.pick(data[0], 'aid', 'owner_id', 'url', 'duration');
        return dfd.resolve(audio);
      }).fail(function() {
        return dfd.reject.apply(dfd, arguments);
      });
      return dfd.promise();
    };

    Proxy.prototype.addToWall = function(audio_id, owner_id) {
      var dfd, params;
      dfd = new $.Deferred();
      params = {
        attachments: "audio" + owner_id + "_" + audio_id
      };
      this.vk.api('audio.add', params, function(data) {
        if (keypath(data, 'error') != null) {
          return dfd.reject(data.error_msg);
        } else {
          return dfd.resolve(data.response);
        }
      });
      return dfd.promise();
    };

    Proxy.prototype.addToAudio = function(audio_id, owner_id) {
      var dfd, params;
      dfd = new $.Deferred();
      params = {
        aid: audio_id,
        oid: owner_id
      };
      this.vk.api('audio.add', params, function(data) {
        if (keypath(data, 'error') != null) {
          return dfd.reject(data.error_msg);
        } else {
          return dfd.resolve(data.response);
        }
      });
      return dfd.promise();
    };

    Proxy.prototype.getAudioList = function() {
      var dfd;
      dfd = new $.Deferred();
      this.vk.api('audio.get', {}, function(data) {
        if ('error' in data) {
          return dfd.reject(data.error);
        } else {
          return dfd.resolve(vkFilters.getAudio(data.response));
        }
      });
      return dfd.promise();
    };

    return Proxy;

  })();
  config = module.config();
  lastFm = new LastFm(config.lastFm_key, config.lastFm_url);
  return proxy = new Proxy(lastFm, vk);
});
