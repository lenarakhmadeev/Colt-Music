
define(['jquery', 'vk', 'services/proxy/vkFilters'], function($, vk, vkFilters) {
  'use strict';

  var vkProxy;
  return vkProxy = {
    searchAudio: function(artist, title, offset, count) {
      var dfd, params;
      dfd = new $.Deferred();
      params = {
        q: "" + artist + " - " + title,
        sort: 2,
        auto_complete: 1,
        count: count,
        offset: offset
      };
      vk.api('audio.search', params, function(data) {
        var result;
        if ('error' in data) {
          return dfd.reject(data.error);
        } else {
          result = vkFilters.searchAudio(data.response);
          return dfd.resolve(result);
        }
      });
      return dfd.promise();
    },
    getAudioUrl: function(artist, title) {
      var dfd;
      dfd = new $.Deferred();
      this.searchAudio(artist, title, 0, 1).done(function(data) {
        var result;
        result = vkFilters.audioUrl(data);
        return dfd.resolve(result);
      }).fail(function() {
        return dfd.reject.apply(dfd, arguments);
      });
      return dfd.promise();
    },
    addToWall: function(audio_id, owner_id) {
      var dfd, params;
      dfd = new $.Deferred();
      params = {
        attachments: "audio" + owner_id + "_" + audio_id
      };
      vk.api('wall.post', params, function(data) {
        console.log('post', data);
        if ('error' in data) {
          return dfd.reject(data.error);
        } else {
          return dfd.resolve(data.response);
        }
      });
      return dfd.promise();
    },
    addToAudio: function(audio_id, owner_id) {
      var dfd, params;
      dfd = new $.Deferred();
      params = {
        aid: audio_id,
        oid: owner_id
      };
      vk.api('audio.add', params, function(data) {
        if ('error' in data) {
          return dfd.reject(data.error);
        } else {
          return dfd.resolve(data.response);
        }
      });
      return dfd.promise();
    },
    getAudioList: function() {
      var dfd;
      dfd = new $.Deferred();
      vk.api('audio.get', {}, function(data) {
        if ('error' in data) {
          return dfd.reject(data.error);
        } else {
          return dfd.resolve(vkFilters.getAudio(data.response));
        }
      });
      return dfd.promise();
    }
  };
});
