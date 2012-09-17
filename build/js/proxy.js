var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jquery', 'module', 'underscore', 'lastFm', 'vk'], function($, module, _, LastFm, vk) {
  var Proxy, config, filterSim, filterTags, getAudio, infoFilter, keyOrPluck, keypath, lastFm, proxy, searchAudioFilter, similarFilter;
  keypath = function(object, keypath, _default) {
    var key, keys, result, _i, _len;
    if (_default == null) {
      _default = null;
    }
    keypath = _.isNumber(keypath) ? '' + keypath : keypath;
    keys = _.isString(keypath) ? keypath.split(".") : keypath;
    result = object;
    for (_i = 0, _len = keys.length; _i < _len; _i++) {
      key = keys[_i];
      if (_.isObject(result) && key in result) {
        result = result[key];
      } else {
        result = _default;
        break;
      }
    }
    return result;
  };
  keyOrPluck = function(data, key) {
    if (data === null) {
      return null;
    }
    if (_.isArray(data)) {
      return _.pluck(data, key);
    } else {
      return [data[key]];
    }
  };
  filterTags = function(data) {
    var tags;
    tags = keypath(data, 'track.toptags.tag', {});
    return keyOrPluck(tags, 'name') || null;
  };
  filterSim = function(data) {
    return {
      artist: keypath(data, 'artist.name'),
      title: keypath(data, 'name'),
      album_cover: keypath(data, 'image.1.#text')
    };
  };
  infoFilter = function(data) {
    return {
      album: keypath(data, 'track.album.title'),
      album_cover: keypath(data, 'track.album.image.1.#text'),
      tags: filterTags(data),
      wiki: keypath(data, 'track.wiki')
    };
  };
  similarFilter = function(data) {
    var temp, tracks;
    temp = keypath(data, 'similartracks.track');
    if (_.isString(temp)) {
      return [];
    }
    tracks = _.isArray(temp) ? temp : [temp];
    return _.map(tracks, filterSim);
  };
  searchAudioFilter = function(data) {
    return data.slice(1);
  };
  getAudio = function(data) {
    l('dataFilter.getAudio', arguments);
    return data.response;
  };
  Proxy = (function() {

    function Proxy(lastFm, vk) {
      this.lastFm = lastFm;
      this.vk = vk;
      this.addToAudio = __bind(this.addToAudio, this);

      this.addToWall = __bind(this.addToWall, this);

      this.searchAudio = __bind(this.searchAudio, this);

      this.getArtistTopTracks = __bind(this.getArtistTopTracks, this);

      this.getSimilarTracks = __bind(this.getSimilarTracks, this);

      this.getTrackInfo = __bind(this.getTrackInfo, this);

    }

    Proxy.prototype.getTrackInfo = function(artist, title) {
      var dfd,
        _this = this;
      dfd = new $.Deferred();
      this.lastFm.getTrackInfo(artist, title).done(function(data, textStatus, jqXHR) {
        if ('error' in data) {
          return dfd.reject(data.message);
        } else {
          return dfd.resolve(infoFilter(data));
        }
      }).error(function(jqXHR, textStatus, message) {
        return dfd.reject(message);
      });
      return dfd.promise();
    };

    Proxy.prototype.getSimilarTracks = function(artist, title, offset, count) {
      var dfd,
        _this = this;
      dfd = new $.Deferred();
      this.lastFm.getSimilarTracks(artist, title, offset + count).done(function(data, textStatus, jqXHR) {
        var result;
        if ('error' in data) {
          return dfd.reject(data.message);
        } else {
          result = similarFilter(data).slice(offset);
          return dfd.resolve(result);
        }
      }).error(function(jqXHR, textStatus, message) {
        return dfd.reject(message);
      });
      return dfd.promise();
    };

    Proxy.prototype.getArtistTopTracks = function(artist, offset, count) {
      var dfd,
        _this = this;
      dfd = new $.Deferred();
      this.lastfmApi.getArtistTopTracks(artist, 1, offset + count).done(function(data, textStatus, jqXHR) {
        var result;
        if ('error' in data) {
          return dfd.reject(data.message);
        } else {
          result = topTracksFilter(data).slice(offset);
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
          result = searchAudioFilter(data.response);
          return dfd.resolve(result);
        }
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

    Proxy.prototype.getAudio = function() {
      var dfd;
      dfd = new $.Deferred();
      this.vk.api('audio.get', {}, function(data) {
        if ('error' in data) {
          return dfd.reject(data.error);
        } else {
          return dfd.resolve(data.response);
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
