
define(function(require) {
  var $, LastFm;
  $ = require('$');
  return LastFm = (function() {

    function LastFm(api_key, api_url) {
      this.api_key = api_key;
      this.api_url = api_url;
    }

    LastFm.prototype.callApi = function(params) {
      return $.ajax({
        url: this.api_url,
        dataType: 'jsonp',
        data: params
      });
    };

    LastFm.prototype.getTrackInfo = function(artist, title) {
      return this.callApi({
        method: 'track.getInfo',
        autocorrect: 1,
        api_key: this.api_key,
        artist: artist,
        track: title,
        format: 'json'
      });
    };

    LastFm.prototype.getSimilarTracks = function(artist, title, limit) {
      return this.callApi({
        method: 'track.getSimilar',
        autocorrect: 1,
        api_key: this.api_key,
        artist: artist,
        track: title,
        limit: limit,
        format: 'json'
      });
    };

    LastFm.prototype.getArtistTopTracks = function(artist, page, limit) {
      return this.callApi({
        method: 'artist.getTopTracks',
        autocorrect: 1,
        api_key: this.api_key,
        artist: artist,
        page: page,
        limit: limit,
        format: 'json'
      });
    };

    return LastFm;

  })();
});
